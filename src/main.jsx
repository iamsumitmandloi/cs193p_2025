// Polyfill window.storage using localStorage
window.storage = {
    get: async (key) => {
        const value = localStorage.getItem(key);
        return value ? { value } : null;
    },
    set: async (key, value) => {
        localStorage.setItem(key, value);
    },
};

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
