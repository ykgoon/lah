// DOM Elements
const inputText = document.getElementById('inputText') as HTMLTextAreaElement;
const outputText = document.getElementById('outputText') as HTMLTextAreaElement;
const translateBtn = document.getElementById('translateBtn') as HTMLButtonElement;
const copyBtn = document.getElementById('copyBtn') as HTMLButtonElement;
const authModal = document.getElementById('authModal') as HTMLDivElement;
const apiKeyInput = document.getElementById('apiKey') as HTMLInputElement;
const saveKeyBtn = document.getElementById('saveKeyBtn') as HTMLButtonElement;
const closeModal = document.querySelector('.close') as HTMLSpanElement;

// Constants
const API_URL = import.meta.env.VITE_API_URL;
const COOKIE_NAME = 'manglish_translator_token';
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
        const response = await fetch(`${API_URL}/translate`, {
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

saveKeyBtn.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    if (!key) return;
    
    setCookie(COOKIE_NAME, key, TOKEN_EXPIRY_DAYS);
    authModal.style.display = 'none';
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
