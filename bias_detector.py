from transformers import pipeline
from bs4 import BeautifulSoup
from newspaper import Article
import requests
import nltk


def get_text(url):
    try:
        article = Article(url)
        article.download()
        article.parse()

        raw_text = article.text.strip()

        if not raw_text:
            try:
                response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
                response.raise_for_status()  # Raise exception for 4XX/5XX status codes
                soup = BeautifulSoup(response.text, "html.parser")
                paragraphs = [p.get_text() for p in soup.find_all("p")]
                raw_text = "\n".join(paragraphs)

            except (requests.exceptions.RequestException, requests.exceptions.HTTPError) as e:
                return None

        return raw_text

    except Exception as e:
        return

class BiasDetector():
    def __init__(self):
        self.score = pipeline("text-classification", model="./binary_bias_bert")


    def sentence_level_score(self, text):
        sentences = nltk.sent_tokenize(text)  # Split into sentences
        biased_count = 0
        total_sentences = len(sentences)

        for sentence in sentences:
            result = self.score(sentence)[0]  # Get classification result

            if result['label'] == 'LABEL_1' and result['score'] > 0.7:  # Count how many are biased
                biased_count += 1

        bias_score = biased_count / total_sentences if total_sentences > 0 else 0
        return bias_score * 100

    def bias_score(self, url):
        raw_text = get_text(url)
        if raw_text is None:
            return None

        return self.sentence_level_score(raw_text)