const BASE_URL = 'https://api.thecatapi.com/v1';
import { refs } from './index';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusCode);
    }
    return resp.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}/breeds/${breedId}`).then(resp => {
    if (!resp.ok) {
      refs.loaderEl.style.display = 'none';
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      throw new Error(resp.statusCode);
    }
    return resp.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
