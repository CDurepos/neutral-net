from flask import Blueprint, current_app, request, jsonify

search_bp = Blueprint('search', __name__)

@search_bp.route('/api/search', methods=['POST'])
def handle_search():
    data = request.get_json()
    query = data.get('query', '')
    num_results = data.get('num_results', 10)

    if not query:
        return jsonify({'error': 'Query is required'}), 400

    results = current_app.search_engine.search(query, num_results)
    return jsonify(results)
