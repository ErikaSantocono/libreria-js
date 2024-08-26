import axios from 'axios';
import _ from 'lodash';

export async function searchBooks(category) {
  const apiUrl = `https://openlibrary.org/subjects/${category}.json`;
  try {
    const response = await axios.get(apiUrl);
    return _.get(response, 'data.works', []);
  } catch (error) {
    console.error('Errore nel recupero dei libri:', error);
    return [];
  }
}

export async function getBookDescription(bookKey) {
  const descriptionUrl = `https://openlibrary.org${bookKey}.json`;
  try {
    const response = await axios.get(descriptionUrl);
    return _.get(response, 'data.description', 'Descrizione non disponibile.');
  } catch (error) {
    console.error('Errore nel recupero della descrizione del libro:', error);
    return 'Descrizione non disponibile.';
  }
}
