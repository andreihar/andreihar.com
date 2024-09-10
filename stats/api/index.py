from flask import Flask, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
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

projects = [
    "howl", "memory-lane", "emotion-recognition", "ar-homographies",
    "3d-reconstruction", "plane-segmenter", "taibun", "nct",
    "chharm-cooks", "segpalette", "knights-and-knaves", "poisson-blending",
    "quilt-tex", "footy-ai"
]

blogs = ["dragons-freedom-and-mods"]

def load_data():
    try:
        project_doc_ref = db.collection('stats').document('project')
        blog_doc_ref = db.collection('stats').document('blog')
        
        project_doc = project_doc_ref.get()
        blog_doc = blog_doc_ref.get()
        
        data = {
            "project": project_doc.to_dict().get('projects', []) if project_doc.exists else [],
            "blog": blog_doc.to_dict().get('blogs', []) if blog_doc.exists else []
        }
        
        return data
    except Exception as e:
        print(f"Error loading data: {e}")
        return {"project": [], "blog": []}

def save_data(category, name):
    try:
        doc_ref = db.collection('stats').document(category)
        doc = doc_ref.get()
        
        if doc.exists:
            items = doc.to_dict().get(category + 's', [])
            if name not in items:
                items.append(name)
                doc_ref.update({category + 's': items})
        else:
            doc_ref.set({category + 's': [name]})
        
        item_doc_ref = db.collection(category).document(name)
        item_doc = item_doc_ref.get()
        
        if not item_doc.exists:
            item_doc_ref.set({"likes": 0, "views": 0})
    except Exception as e:
        print(f"Error saving data: {e}")

data = load_data()

for project in projects:
    if project not in data['project']:
        save_data('project', project)

for blog in blogs:
    if blog not in data['blog']:
        save_data('blog', blog)

@app.route('/update_view/<category>/<name>', methods=['POST'])
def update_view(category, name):
    if category in data and name in data[category]:
        item_doc_ref = db.collection(category).document(name)
        item_doc = item_doc_ref.get()
        
        if item_doc.exists:
            item_data = item_doc.to_dict()
            item_data['views'] += 1
            item_doc_ref.update(item_data)
            return jsonify({"message": "View updated"})
        else:
            save_data(category, name)
            return jsonify({"message": "Item created and view updated"})
    return jsonify({"message": "Not found"}), 404

@app.route('/update_like/<category>/<name>', methods=['POST'])
def update_like(category, name):
    if category in data and name in data[category]:
        item_doc_ref = db.collection(category).document(name)
        item_doc = item_doc_ref.get()
        
        if item_doc.exists:
            item_data = item_doc.to_dict()
            item_data['likes'] += 1
            item_doc_ref.update(item_data)
            return jsonify({"message": "Like updated"})
        else:
            save_data(category, name)
            return jsonify({"message": "Item created and like updated"})
    return jsonify({"message": "Not found"}), 404

@app.route('/get_stats/<category>/<name>', methods=['GET'])
def get_stats(category, name):
    if category in data and name in data[category]:
        item_doc_ref = db.collection(category).document(name)
        item_doc = item_doc_ref.get()
        
        if item_doc.exists:
            return jsonify(item_doc.to_dict())
    return jsonify({"message": "Not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)