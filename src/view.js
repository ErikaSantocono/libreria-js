import { searchBooks, getBookDescription } from './service.js';

export function displayBooks(bookList) {
  const resultsContainer = document.getElementById('results');
  bookList.forEach(book => {
    const bookElement = document.createElement('div');
    bookElement.className = 'book';
    bookElement.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.authors.map(author => author.name).join(', ')}</p>
      <button class="description-button" data-key="${book.key}">Show Description</button>`;
    resultsContainer.appendChild(bookElement);
  });

  document.querySelectorAll('.description-button').forEach(button => {
    button.addEventListener('click', async (event) => {
      const bookKey = event.target.getAttribute('data-key');
      const description = await getBookDescription(bookKey);
      alert(description);
    });
  });
}

export function setupEventListeners() {
  document.getElementById('searchButton').addEventListener('click', async () => {
    document.getElementById('results').innerHTML = '';
    const categoryInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const books = await searchBooks(categoryInput);
    displayBooks(books.slice(0, 10));
  });

  document.getElementById('searchInput').addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
      document.getElementById('results').innerHTML = '';
      const categoryInput = document.getElementById('searchInput').value.trim().toLowerCase();
      const books = await searchBooks(categoryInput);
      displayBooks(books.slice(0, 10));
    }
  });

  document.getElementById('readMoreButton').addEventListener('click', loadMoreBooks);
}

let books = [];
let startIndex = 0;

function loadMoreBooks() {
  const additionalBooks = books.slice(startIndex, startIndex + 5);
  displayBooks(additionalBooks);
  startIndex += 5;

  if (startIndex >= books.length) {
    document.getElementById('readMoreButton').disabled = true;
    document.getElementById('readMoreButton').innerText = 'No more books';
  }
}
