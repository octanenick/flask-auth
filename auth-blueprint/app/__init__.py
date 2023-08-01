from flask import Flask
from .main.models import db
from .main.routes import main

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://user:password@localhost/db'
    db.init_app(app)
    app.register_blueprint(main)
    return app
