from flask import Flask, request, jsonify
from recommender import get_recommendations
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app = Flask(__name__)

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    student_input = data['student']
    listings = data['listings']
    recommendations = get_recommendations(student_input, listings)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(port=5001, debug=True)
