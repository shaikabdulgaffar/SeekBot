from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from model_loader import chat_with_model

app = Flask(__name__, static_folder="static", template_folder="template")
CORS(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "")
    response = chat_with_model(user_message)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)