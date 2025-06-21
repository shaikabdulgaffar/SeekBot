# Seek Bot - Deepseek-R1 Chatbot

Seek Bot is a web-based chatbot interface powered by the Deepseek-R1 AI model, running locally via [Ollama](https://ollama.com/). The project features a modern, responsive frontend and a Flask backend that communicates with the Deepseek model through Ollama's API.

---

## Features

- **Conversational AI**: Chat with the Deepseek-R1 model locally.
- **Modern UI**: Responsive, clean chat interface with light/dark mode toggle.
- **Copy Responses**: Easily copy bot responses to clipboard.
- **New Chat**: Start a fresh conversation at any time.
- **Markdown Support**: Bot responses support markdown formatting.
- **Typing Indicator**: Animated indicator while the bot is generating a response.

---

## Project Structure

```
README.md
app.py
mode_loader.py
requirements.txt
static/
    logo.png
    main.js
    style.css
template/
    index.html
```

---

## Prerequisites

- **Python 3.8+**
- **[Ollama](https://ollama.com/)** running locally
- **Deepseek-R1 model** pulled via Ollama

---

## Ollama and Model Setup

1. **Install Ollama**  
   Download and install Ollama from [https://ollama.com/download](https://ollama.com/download).

2. **Pull the Deepseek-R1 Model**  
   Open a terminal and run:
   ```sh
   ollama pull deepseek-r1:1.5b-qwen-distill-q4_K_M
   ```

3. **Start Ollama**  
   Ensure Ollama is running (it usually starts automatically).  
   The API should be available at `http://localhost:11434`.

---

## Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd deepseek-chatbot
   ```

2. **Install Python dependencies:**
   ```sh
   pip install -r requirements.txt
   ```

3. **Run the Flask app:**
   ```sh
   python app.py
   ```
   The app will be available at [http://localhost:5000](http://localhost:5000).

---

## Usage

- Open your browser and go to [http://localhost:5000](http://localhost:5000).
- Type your message in the input box and press Enter or click the send button.
- Toggle between light and dark mode using the moon/sun icon.
- Start a new chat using the edit icon.
- Copy bot responses using the copy button next to each response.

---

## Configuration

- **Model and API URL**: You can change the model or Ollama API endpoint in [`mode_loader.py`](mode_loader.py).
- **Frontend Customization**: Modify styles in [`static/style.css`](static/style.css) and logic in [`static/main.js`](static/main.js).

---

## File Overview

- [`app.py`](app.py): Flask server, API endpoints, and template rendering.
- [`mode_loader.py`](mode_loader.py): Sends user prompts to Ollama and returns model responses.
- [`static/main.js`](static/main.js): Handles chat UI, message sending, theme toggling, and user interactions.
- [`static/style.css`](static/style.css): All styles for the chat interface.
- [`template/index.html`](template/index.html): Main HTML structure.

---

## Troubleshooting

- **Ollama not running**: Ensure Ollama is started and the model is pulled.
- **CORS issues**: The Flask app uses `flask-cors` to allow frontend-backend communication.
- **Model errors**: Check Ollama logs for model-specific errors.

---

## License

This project is for personal/local use. Please check the licenses for Ollama and Deepseek models for commercial or redistribution use.

---

**Made with ❤️ using Deepseek-R1