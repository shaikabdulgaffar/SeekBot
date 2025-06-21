// Paste your JS logic here, but change addBotResponse to use Flask backend
class Chatbot {
    constructor() {
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.messagesContainer = document.getElementById('messagesContainer');
        this.initialState = document.getElementById('initialState');
        this.chatArea = document.getElementById('chatArea');
        this.modelSelect = document.getElementById('modelSelect');
        this.themeToggle = document.getElementById('themeToggle');
        this.newChatBtn = document.getElementById('newChatBtn');
        
        this.initializeTheme();
        this.initializeEventListeners();
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const icon = this.themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    initializeEventListeners() {
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        this.messageInput.addEventListener('input', () => {
            this.updateSendButton();
        });
        
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        this.newChatBtn.addEventListener('click', () => {
            this.newChat();
        });
        
        this.updateSendButton();
    }

    updateSendButton() {
        const hasText = this.messageInput.value.trim().length > 0;
        this.sendBtn.disabled = !hasText;
        this.sendBtn.style.opacity = hasText ? '1' : '0.5';
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        this.showMessagesContainer();
        this.addMessage(message, 'user');
        
        this.messageInput.value = '';
        this.updateSendButton();
        
        this.showTypingIndicator();

        try {
            // Call Flask backend
            const res = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });
            const data = await res.json();
            this.hideTypingIndicator();
            this.addMessage(data.response, 'bot');
        } catch (err) {
            this.hideTypingIndicator();
            this.addMessage("Error: Couldn't connect to backend.", 'bot');
        }
    }

    showMessagesContainer() {
        this.initialState.style.display = 'none';
        this.messagesContainer.style.display = 'flex';
    }

    addMessage(content, type) {
        // Remove only unwanted HTML tags (like <think>), but keep markdown
        content = content.replace(/<(think|\/think|\/?speak|\/?pause).*?>/gi, '').trim();

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = type === 'user'
            ? '<i class="fas fa-user"></i>'
            : '<img src="/static/logo.png" alt="Bot Logo" style="height:20px;width:20px;object-fit:contain;">';
        
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'message-content-wrapper';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';

        if (type === 'bot') {
            // Convert markdown to HTML for bot messages
            messageContent.innerHTML = marked.parse(content);
        } else {
            // User messages as plain text
            messageContent.textContent = content;
        }
        
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'message-actions';
        
        // Add copy button for bot messages
        if (type === 'bot') {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'action-btn copy-btn';
            copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            copyBtn.title = 'Copy message';
            
            const feedback = document.createElement('div');
            feedback.className = 'copy-feedback';
            feedback.textContent = 'Copied!';
            copyBtn.appendChild(feedback);
            
            copyBtn.addEventListener('click', () => this.copyMessage(content, feedback));
            
            actionsDiv.appendChild(copyBtn);
        }
        
        contentWrapper.appendChild(messageContent);
        contentWrapper.appendChild(actionsDiv);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(contentWrapper);
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    copyMessage(content, feedback) {
        navigator.clipboard.writeText(content).then(() => {
            feedback.classList.add('show');
            setTimeout(() => {
                feedback.classList.remove('show');
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing-message';
        typingDiv.id = 'typingIndicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = '<img src="/static/logo.png" alt="Bot Logo" style="height:20px;width:20px;object-fit:contain;">';
        
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'message-content-wrapper';
        
        const typingContent = document.createElement('div');
        typingContent.className = 'message-content';
        
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        
        typingContent.appendChild(typingIndicator);
        contentWrapper.appendChild(typingContent);
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(contentWrapper);
        
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    newChat() {
        this.messagesContainer.innerHTML = '';
        this.messagesContainer.style.display = 'none';
        this.initialState.style.display = 'flex';
        this.messageInput.value = '';
        this.updateSendButton();
    }

    scrollToBottom() {
        this.chatArea.scrollTop = this.chatArea.scrollHeight;
    }
}

// Initialize the chatbot when the page loads with smooth entrance
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    setTimeout(() => {
        document.body.style.transition = 'all 0.6s ease-out';
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
        new Chatbot();
    }, 100);
});

window.addEventListener('resize', () => {
    const chatArea = document.getElementById('chatArea');
    if (chatArea) {
        setTimeout(() => {
            chatArea.scrollTop = chatArea.scrollHeight;
        }, 100);
    }
});

document.documentElement.style.scrollBehavior = 'smooth';