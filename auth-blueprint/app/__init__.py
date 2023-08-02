from flask import Flask
from flask_migrate import Migrate  
from .main.models import db
from .main.routes import main
from flask_jwt_extended import JWTManager
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost:8889/goalie2'
    app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # replace with your secret key
    
    db.init_app(app)
    migrate = Migrate(app, db)  
    JWTManager(app)  # initialize JWTManager with the Flask app

    app.register_blueprint(main)

    return app
