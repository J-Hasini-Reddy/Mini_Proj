from flask import Flask, request, jsonify
from recommender import get_recommendations
from mock_listings import mock_listings

app = Flask(__name__)

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    recommendations = get_recommendations(data, mock_listings)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(port=5000, debug=True)