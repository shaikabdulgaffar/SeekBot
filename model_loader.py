import requests

OLLAMA_API_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "deepseek-r1:1.5b-qwen-distill-q4_K_M" 

def chat_with_model(user_message):
    payload = {
        "model": MODEL_NAME,
        "prompt": user_message,
        "stream": False
    }
    response = requests.post(OLLAMA_API_URL, json=payload)
    response.raise_for_status()
    data = response.json()
    return data.get("response", "No response from model.")