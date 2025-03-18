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
const COOKIE_NAME = 'kt_token';
const TOKEN_EXPIRY_DAYS = 7;

// Helper function to get API endpoint based on environment
function getApiEndpoint(path: string): string {
    return import.meta.env.DEV ? `http://localhost${path}` : `${API_URL}${path}`;
}

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
        const response = await fetch(getApiEndpoint('/api/v1/infer'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({ messages: [
                {
                    role: "developer",
                    context: "This is a passage written in Manglish, translate it to Oxford English.",
                },
                {
                    role: "user",
                    context: text,
                },
            ]})
        });

        if (!response.ok) throw new Error('Translation failed');

        const data = await response.json();
        outputText.value = data.choices[0].message.content;

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
        const response = await fetch(getApiEndpoint('/api/v1/auth'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
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
