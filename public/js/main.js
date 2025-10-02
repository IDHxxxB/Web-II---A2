// main.js

// API base URL - This way, if the port number is changed, only this part needs to be updated
const API_BASE_URL = 'http://localhost:3000/api';

// A general function for displaying error messages
function showError(message, container) {
    container.innerHTML = `<div class="error-message">${message}</div>`;
}

// Date formatting function
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Price formatting function
function formatCurrency(amount) {
    return '¥' + parseFloat(amount).toFixed(2);
}

// The function for displaying the loading status
function showLoading(container) {
    container.innerHTML = '<div class="loading">Loading...</div>';
}