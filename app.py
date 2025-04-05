from flask import Flask, render_template, request, jsonify
from search_engine import SearchEngine
from bias_detector import BiasDetector

app = Flask(__name__)

search_engine = SearchEngine()
bd = BiasDetector()


@app.route('/')
def index():
    show_warning = bd.score.device.type != "cuda"
    return render_template('index.html', show_warning=show_warning)


@app.route('/search', methods=['POST'])
def search_articles():
    query = request.form.get('query')
    num_results = int(request.form.get('num_results', 10))

    if not query:
        return jsonify({'error': 'Please provide a search query'}), 400

    try:
        results = search_engine.search(query, num_results)

        if not results:
            return render_template(
                'results.html',
                query=query,
                results=[],
            )

        return render_template(
            'results.html',
            query=query,
            results=results
        )

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/analyze', methods=['POST'])
def analyze_url():
    url = request.form.get('url')

    if not url:
        return jsonify({'error': 'Please provide a URL'}), 400

    try:
        bias_score = bd.bias_score(url)
        return jsonify({
            'url': url,
            'bias_score': bias_score,
            'analysis': get_bias_description(bias_score)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


def get_bias_description(score):
    if score < 0.2:
        return "Very low bias - This content appears to be mostly factual and neutral."
    elif score < 0.4:
        return "Low bias - This content contains some bias but is mostly factual."
    elif score < 0.6:
        return "Moderate bias - This content shows significant bias."
    elif score < 0.8:
        return "High bias - This content is heavily biased and should be read critically."
    else:
        return "Very high bias - This content appears to be extremely biased and is likely a piece of propaganda."


if __name__ == '__main__':
    app.run(debug=True)