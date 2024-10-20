// script.js

const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API endpoint
let quotes = [];

// Load quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Fetch quotes from the server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(API_URL);
        if (response.ok) {
            const serverQuotes = await response.json();
            updateQuotes(serverQuotes); // Update local quotes with server quotes
        }
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
}

// Update local quotes and handle conflicts
function updateQuotes(serverQuotes) {
    // Here, we simply replace the local quotes with server quotes for simplicity
    // In a real-world scenario, you might want to merge instead
    const existingCategories = new Set(quotes.map(q => q.category));
    
    serverQuotes.forEach(serverQuote => {
        const { title: text, body: category } = serverQuote; // Simulating quote structure
        if (!existingCategories.has(category)) {
            quotes.push({ text, category });
        }
    });

    saveQuotes();
    populateCategories(); // Refresh the categories
    notifyUser('Quotes updated from server.');
}

// Notify user about updates
function notifyUser(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '10px';
    notification.style.right = '10px';
    notification.style.backgroundColor = 'lightgreen';
    notification.style.padding = '10px';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// Initialize the application
async function initialize() {
    loadQuotes();
    await fetchQuotesFromServer(); // Fetch quotes on initialization
    populateCategories();
    restoreLastFilter();

    // Fetch quotes from the server periodically
    setInterval(() => {
        fetchQuotesFromServer();
    }, 30000); // Fetch every 30 seconds
}

// Call initialize on page load
initialize();
