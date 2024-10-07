from flask import Flask, jsonify, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
from urllib.parse import urlparse
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

app = Flask(__name__)
CORS(app)

firebase_credentials = {
    "type": os.environ.get('FIREBASE_TYPE'),
    "project_id": os.environ.get('FIREBASE_PROJECT_ID'),
    "private_key_id": os.environ.get('FIREBASE_PRIVATE_KEY_ID'),
    "private_key": os.environ.get('FIREBASE_PRIVATE_KEY', '').replace('\\n', '\n'),
    "client_email": os.environ.get('FIREBASE_CLIENT_EMAIL'),
    "client_id": os.environ.get('FIREBASE_CLIENT_ID'),
    "auth_uri": os.environ.get('FIREBASE_AUTH_URI'),
    "token_uri": os.environ.get('FIREBASE_TOKEN_URI'),
    "auth_provider_x509_cert_url": os.environ.get('FIREBASE_AUTH_PROVIDER_X509_CERT_URL'),
    "client_x509_cert_url": os.environ.get('FIREBASE_CLIENT_X509_CERT_URL'),
    "universe_domain": "googleapis.com"
}

cred = credentials.Certificate(firebase_credentials)
firebase_admin.initialize_app(cred)
db = firestore.client()

allowed_domain = os.environ.get('ALLOWED_DOMAIN', 'localhost:3000')

def extract_domain(url):
    if not url:
        return None
    parsed_url = urlparse(url)
    domain = parsed_url.netloc
    if domain.startswith("www."):
        domain = domain[4:]
    return domain

def is_valid_origin():
    origin = request.headers.get('Origin')
    referer = request.headers.get('Referer')
    
    origin_domain = extract_domain(origin)
    referer_domain = extract_domain(referer)
    
    return origin_domain == allowed_domain or referer_domain == allowed_domain

@app.route('/update_view/<category>/<name>', methods=['POST'])
def update_view(category, name):
    if not is_valid_origin():
        return jsonify({"message": "Forbidden"}), 403

    item_doc_ref = db.collection(category).document(name)
    item_doc = item_doc_ref.get()
    
    if item_doc.exists:
        item_data = item_doc.to_dict()
        item_data['views'] += 1
        item_doc_ref.update(item_data)
        return jsonify({"message": "View updated"})
    else:
        item_doc_ref.set({"likes": 0, "views": 1})
        return jsonify({"message": "Item created and view updated"})

@app.route('/update_like/<category>/<name>', methods=['POST'])
def update_like(category, name):
    if not is_valid_origin():
        return jsonify({"message": "Forbidden"}), 403

    item_doc_ref = db.collection(category).document(name)
    item_doc = item_doc_ref.get()
    
    if item_doc.exists:
        item_data = item_doc.to_dict()
        item_data['likes'] += 1
        item_doc_ref.update(item_data)
        return jsonify({"message": "Like updated"})
    else:
        item_doc_ref.set({"likes": 1, "views": 1})
        return jsonify({"message": "Item created and like updated"})

@app.route('/get_stats/<category>/<name>', methods=['GET'])
def get_stats(category, name):
    if not is_valid_origin():
        return jsonify({"message": "Forbidden"}), 403

    item_doc_ref = db.collection(category).document(name)
    item_doc = item_doc_ref.get()
    
    if item_doc.exists:
        return jsonify(item_doc.to_dict())
    else:
        item_doc_ref.set({"likes": 0, "views": 0})
        return jsonify({"message": "Item created", "likes": 0, "views": 0})

if __name__ == '__main__':
    app.run(debug=True)