import os
import serpapi
from dotenv import load_dotenv
from app.core.bias_detector import BiasDetector

class SearchEngine:
    def __init__(self):
        load_dotenv()
        self.api_token = os.getenv("SERPAPI_KEY")
        self.detector = BiasDetector()

    def search(self, query, num_results=10):
        search = serpapi.search({"q": query,
                                 "num": num_results,
                                 "api_key": self.api_token,
                                 "engine": "google",
                                 "tbm": "nws"})
        results = search.as_dict()

        search_results = []
        for result in results['news_results']:
            bias_score = self.detector.bias_score(result['link'])
            if bias_score is not None:
                search_results.append({
                    'title': result['title'],
                    'link': result['link'],
                    'score': bias_score
                })

        search_results = sorted(search_results, key=lambda k: k['score'])

        return search_results

if __name__ == "__main__":
    search_engine = SearchEngine()
    print(search_engine.search(query="Quantum Computing"))