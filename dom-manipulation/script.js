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

// Load quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem("quotes");
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    } else {
        // Default quotes if nothing is in local storage
        quotes = [
            { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspiration" },
            { text: "The purpose of our lives is to be happy.", category: "Happiness" },
            { text: "Life is what happens when you're busy making other plans.", category: "Life" },
        ];
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${randomQuote.text}" - ${randomQuote.category}`;

    // Store last viewed quote in session storage
    sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

function addQuote() {
    const quoteText = quoteTextInput.value.trim();
    const quoteCategory = quoteCategoryInput.value.trim();

    if (quoteText && quoteCategory) {
        quotes.push({ text: quoteText, category: quoteCategory});
        saveQuotes();

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

// Export quotes to JSON
function exportQuotes() {
    const jsonStr = JSON.stringify(quotes);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
}

// Import quotes from JSON
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Initialize the app
loadQuotes();

showQuoteBtn.addEventListener('click', showRandomQuote);
