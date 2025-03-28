from transformers import pipeline
from bs4 import BeautifulSoup
from newspaper import Article
import requests
import nltk
import re


def get_text(url):
    try:
        article = Article(url)
        article.download()
        article.parse()

        raw_text = article.text.strip()

        if not raw_text:
            try:
                response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
                response.raise_for_status()
                soup = BeautifulSoup(response.text, "html.parser")
                paragraphs = [p.get_text() for p in soup.find_all("p")]
                raw_text = "\n".join(paragraphs)

            except (requests.exceptions.RequestException, requests.exceptions.HTTPError) as e:
                return None

        return raw_text

    except Exception as e:
        return

def to_sentences(text):
    sentences = nltk.sent_tokenize(text)
    short_sent = []
    for sentence in sentences:
        if len(sentence) >= 512:
            short_sent.extend( re.split(r'[.?!\n;]', sentence) )
        else:
            short_sent.append(sentence)

    return [s.strip() for s in short_sent if s.strip()]

class BiasDetector():
    def __init__(self):
        self.score = pipeline("text-classification", model="./binary_bias_bert")


    def bias_score(self, url):
        raw_text = get_text(url)
        if raw_text is None:
            return None

        sentences = to_sentences(raw_text)
        total_sentences = len(sentences)

        results = self.score(sentences)
        biased_count = sum(1 for result in results if result['label'] == 'LABEL_1' and result['score'] > 0.7)

        bias_score = biased_count / total_sentences if total_sentences > 0 else 0
        return bias_score * 100
