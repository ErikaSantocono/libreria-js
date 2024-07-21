    // Variabili per memorizzare i libri e l'indice corrente
let books = [];
let startIndex = 0;

    // Funzione per cercare i libri in base alla categoria
async function searchBooks() {
    // Ottieni il valore dell'input e converti in minuscolo
      const categoryInput = document.getElementById('searchInput').value.trim().toLowerCase(); if (categoryInput === '') return;
    // Costruisci l'URL per l'API e effettua la chiamata all'API
      const apiUrl = `https://openlibrary.org/subjects/${categoryInput}.json`; 

try { const response = await axios.get(apiUrl); books = _.get(response, 'data.works', []); displayBooks(books.slice(0, 10)); startIndex = 10; } 

catch (error) { console.error('Errore nel recupero dei libri:', error);}}

// Funzione per visualizzare i libri
function displayBooks(bookList) { const resultsContainer = document.getElementById('results');
bookList.forEach(book => { const bookElement = document.createElement('div');
        bookElement.className = 'book';
        bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <p>${book.authors.map(author => author.name).join(', ')}</p>
            <button class="description-button" data-key="${book.key}">Show Description</button> `;
resultsContainer.appendChild(bookElement);});

document.querySelectorAll('.description-button').forEach(button => { button.addEventListener('click', showDescription);});}

// Funzione per mostrare la descrizione del libro
async function showDescription(event) {
    const bookKey = event.target.getAttribute('data-key');
    const descriptionUrl = `https://openlibrary.org${bookKey}.json`;

try {const response = await axios.get(descriptionUrl);
     const description = _.get(response, 'data.description', 'Descrizione non disponibile.');
// Visualizza la descrizione con un alert 
alert(description); } catch (error) { console.error('Errore nel recupero della descrizione del libro:', error);}}

// Funzione per caricare più libri
function loadMoreBooks() { const additionalBooks = books.slice(startIndex, startIndex + 5); 
         displayBooks           (additionalBooks); startIndex += 5;

// Verifica se ci sono più libri da caricare
if (startIndex >= books.length) {document.getElementById('readMoreButton').disabled = true;
                                 document.getElementById('readMoreButton').innerText = 'No more books';}}

// Gestori di eventi per il pulsante di ricerca e il tasto "Enter"
document.getElementById('searchButton').addEventListener('click', () => {
document.getElementById('results').innerHTML = ''; searchBooks();});
document.getElementById('searchInput').addEventListener('keypress', function (e) {

if (e.key === 'Enter') {
document.getElementById('results').innerHTML = ''; searchBooks();}});
document.getElementById('readMoreButton').addEventListener('click', loadMoreBooks);

