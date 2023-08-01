from flask import Flask
from flask_migrate import Migrate  
from .main.models import db
from .main.routes import main

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost:8889/goalie2'
    
    db.init_app(app)

    migrate = Migrate(app, db)  

    app.register_blueprint(main)

    return app
