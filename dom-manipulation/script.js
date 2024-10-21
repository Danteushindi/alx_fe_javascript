const quoteDisplay = document.getElementById('quoteDisplay');
const showQuoteBtn = document.getElementById('newQuote');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const quoteForm = document.getElementById('quoteForm');

let quotes = [
{
    text: "Many of life’s failures are people who did not realize how close they were to success when they gave up.",
    category: "Inspirational quotes about life."
},
{
    text: "Everything negative — pressure, challenges — is all an opportunity for me to rise.",
    category: "Life lesson quotes."
},
{
    text: "Courage is being scared to death, but saddling up anyway.",
    category: "Famous quotes about life."
},
{
    text: "You cannot swim for new horizons until you have courage to lose sight of the shore.",
    category: "Beautiful quotes on life."
},
{
    text: "Whether you think you can or you can’t, you’re right.",
    category: "Funny life quotes."
}
];

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
}

function addQuote() {
    const newQuoteTextValue = newQuoteText.value.trim();
    const newQuoteCategoryValue = newQuoteCategory.value.trim();

    if (newQuoteTextValue && newQuoteCategoryValue) {
        quotes.push({ text: newQuoteTextValue, category: newQuoteCategoryValue});
        newQuoteText.value = '';
        newQuoteCategory.value = '';
        alert('Quote added successfully!');
    }
    else {
        alert('Please fill all fields.');
    }
}

// Function to create and display the add quote form
function createAddQuoteForm() {
    quoteForm.style.display = 'block';
}

showQuoteBtn.addEventListener('click', showRandomQuote);
