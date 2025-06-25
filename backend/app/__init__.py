from flask import Flask
from flask_cors import CORS

def create_app():
    from app.core.search_engine import SearchEngine
    search_engine = SearchEngine()

    app = Flask(__name__)
    CORS(app)

    # Inject dependencies via global app context
    app.search_engine = search_engine

    from app.routes.search import search_bp
    app.register_blueprint(search_bp)

    return app
