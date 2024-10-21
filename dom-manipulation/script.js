const quoteDisplay = document.getElementById('quoteDisplay');
const showQuoteBtn = document.getElementById('newQuote');
const quoteTextInput = document.getElementById('newQuoteText');
const quoteCategoryInput = document.getElementById('newQuoteCategory');
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
    quoteDisplay.innerHTML = `"${randomQuote.text}" - ${randomQuote.category}`;
}

function addQuote() {
    const quoteText = quoteTextInput.value.trim();
    const quoteCategory = quoteCategoryInput.value.trim();

    if (quoteText && quoteCategory) {
        quotes.push({ text: quoteText, category: quoteCategory});
        const newQuoteText = document.createElement('p');
        newQuoteText.textContent = `"${quoteText}"`;
        
        const newQuoteCategory = document.createElement('span');
        newQuoteCategory.textContent = ` - ${quoteCategory}`;
        newQuoteCategory.style.fontStyle = 'italic';

        quoteDisplay.innerHTML = ''; // Clear the current display
        quoteDisplay.appendChild(newQuoteText);
        quoteDisplay.appendChild(newQuoteCategory);

        // Clear the input fields
        quoteTextInput.value = '';
        quoteCategoryInput.value = '';
        alert("Quote added successfully!");
    } 
    else {
        alert("Please fill in both fields.");
    }
}

// Function to create and display the add quote form
function createAddQuoteForm() {
    quoteForm.style.display = 'block';
}

showQuoteBtn.addEventListener('click', showRandomQuote);
