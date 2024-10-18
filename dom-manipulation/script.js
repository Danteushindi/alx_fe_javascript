const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const addQuoteButton = document.getElementById('addQuoteButton');

let quotes = [
    {
        text: "The time is always right to do what is right",
        category: "Inspirational"
    },
    {
        text: "Turn your wounds into wisdom.",
        category: "Life Lesson"
    },
    {
        text: "The only thing we have to fear is fear itself",
        category: "Famous"
    },
    {
        text: "You have brains in your head. You have feet in your shoes.",
        category: "Motivational"
    },
    {
        text: "All you need in this life is ignorance and confidence; then success is sure.",
        category: "Humor"
    }
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>${selectedQuote.text} <em>(${selectedQuote.category})</em></p>`;
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert('Quote added successfully!');
    } else {
        alert('Please enter both a quote and a category.');
    }
}

// Event listeners
newQuoteButton.addEventListener('click', showRandomQuote);
addQuoteButton.addEventListener('click', addQuote);

// Show an initial random quote
showRandomQuote();
