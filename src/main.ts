// DOM Elements
const inputText = document.getElementById('inputText') as HTMLTextAreaElement;
const outputText = document.getElementById('outputText') as HTMLTextAreaElement;
const translateBtn = document.getElementById('translateBtn') as HTMLButtonElement;
const copyBtn = document.getElementById('copyBtn') as HTMLButtonElement;
const authModal = document.getElementById('authModal') as HTMLDivElement;
const usernameInput = document.getElementById('username') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;
const loginBtn = document.getElementById('loginBtn') as HTMLButtonElement;
const closeModal = document.querySelector('.close') as HTMLSpanElement;

// Constants
const API_URL = import.meta.env.VITE_API_URL;
const COOKIE_NAME = 'lah_token';
const TOKEN_EXPIRY_DAYS = 7;

// Check for API token on load
document.addEventListener('DOMContentLoaded', () => {
    const token = getCookie(COOKIE_NAME);
    if (!token) {
        authModal.style.display = 'block';
    }
});

// Event Listeners
translateBtn.addEventListener('click', async () => {
    const text = inputText.value.trim();
    if (!text) return;

    const token = getCookie(COOKIE_NAME);
    if (!token) {
        alert('Please authenticate first');
        authModal.style.display = 'block';
        return;
    }

    try {
        // Make the ternary statement below more elegant and readable ai!
        const response = await fetch(import.meta.env.DEV ? '/kakitangan/translate' : `${API_URL}/translate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text })
        });

        if (!response.ok) throw new Error('Translation failed');

        const data = await response.json();
        outputText.value = data.translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        outputText.value = 'Translation failed. Please try again.';
    }
});

copyBtn.addEventListener('click', () => {
    outputText.select();
    document.execCommand('copy');
});

loginBtn.addEventListener('click', async () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) return;

    try {
        // Use the similar logic in line 39 for API_URL ai!
        const response = await fetch(`${API_URL}/api/v1/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) throw new Error('Login failed');

        const { token } = await response.json();
        setCookie(COOKIE_NAME, token, TOKEN_EXPIRY_DAYS);
        authModal.style.display = 'none';
    } catch (error) {
        console.error('Authentication error:', error);
        alert('Login failed. Please check credentials');
    }
});

closeModal.addEventListener('click', () => {
    authModal.style.display = 'none';
});

// Cookie Utilities
function setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}

function getCookie(name: string): string | null {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName)) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
}
