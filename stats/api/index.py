from flask import Flask, jsonify
import json, os

app = Flask(__name__)

def load_data():
    if os.path.exists('backup.json'):
        with open('backup.json', 'r') as file:
            return json.load(file)
    return {"projects": {}, "blogs": {}}

data = load_data()

@app.route('/update_view/<category>/<name>', methods=['POST'])
def update_view(category, name):
    if category in data and name in data[category]:
        data[category][name]['views'] += 1
        return jsonify({"message": "View updated"})
    return jsonify({"message": "Not found"}), 404

@app.route('/update_like/<category>/<name>', methods=['POST'])
def update_like(category, name):
    if category in data and name in data[category]:
        data[category][name]['likes'] += 1
        return jsonify({"message": "Like updated"})
    return jsonify({"message": "Not found"}), 404

@app.route('/get_stats/<category>/<name>', methods=['GET'])
def get_stats(category, name):
    if category in data and name in data[category]:
        return jsonify(data[category][name])
    return jsonify({"message": "Not found"}), 404

@app.route('/dump_data', methods=['GET'])
def dump_data():
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)