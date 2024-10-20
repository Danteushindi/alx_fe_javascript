const API_URL = 'https://jsonplaceholder.typicode.com/posts';
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
            updateQuotes(serverQuotes);
        }
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
}

// Post a new quote to the server
async function postQuoteToServer(quote) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quote),
        });

        if (!response.ok) {
            throw new Error('Failed to post quote to server');
        }

        const newQuote = await response.json();
        // Optionally, you can handle the server's response here
        notifyUser(`Quote posted: "${newQuote.title}"`);
    } catch (error) {
        console.error('Error posting quote:', error);
    }
}

// Update local quotes and handle conflicts
function updateQuotes(serverQuotes) {
    const existingQuotesMap = new Map(quotes.map(q => [q.text, q]));

    serverQuotes.forEach(serverQuote => {
        const { title: text, body: category } = serverQuote;

        if (existingQuotesMap.has(text)) {
            notifyUser(`Conflict detected for quote: "${text}". Using server version.`);
            existingQuotesMap.set(text, { text, category });
        } else {
            existingQuotesMap.set(text, { text, category });
        }
    });

    quotes = Array.from(existingQuotesMap.values());
    saveQuotes();
    populateCategories();
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

// Initialize the application and start periodic fetching
async function initialize() {
    loadQuotes();
    await fetchQuotesFromServer();
    setInterval(fetchQuotesFromServer, 30000);
}

// Add a new quote and post to server
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText.trim() === '' || newQuoteCategory.trim() === '') {
        alert('Please enter both a quote and a category.');
        return;
    }

    const newQuote = { title: newQuoteText, body: newQuoteCategory };
    quotes.push(newQuote);
    saveQuotes();
    postQuoteToServer(newQuote); // Send the new quote to the server
    populateCategories();
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    notifyUser('Quote added successfully!');
}

// Call initialize on page load
initialize();
