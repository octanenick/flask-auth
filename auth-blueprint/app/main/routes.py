from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from .models import db, User

main = Blueprint('main', __name__)

def check_request_data(data):
    if not data or 'username' not in data or 'password' not in data:
        return False
    return True

@main.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()

    if not check_request_data(data):
        return jsonify(message="Missing username or password."), 400

    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()

    if user:
        return jsonify(message="User already exists."), 400

    new_user = User(username=username, password_hash=generate_password_hash(password, method='sha256'))
    db.session.add(new_user)
    db.session.commit()

    return jsonify(message="User created."), 200

@main.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    if not check_request_data(data):
        return jsonify(message="Missing username or password."), 400

    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify(message="Bad credentials."), 401

    token = create_access_token(identity=username)
    return jsonify(token=token), 200

@main.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify(message="This is a protected endpoint."), 200
