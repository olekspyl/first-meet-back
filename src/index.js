import { fetchBreeds, fetchCatByBreed } from './cat-api';
import axios from 'axios';

const API_KEY =
  'live_BaCgLKDd52OE1h5JkR1zxb37HAgSWVxtK59cjorfqr1rmfli33qg02XTqa5bFmri';

axios.defaults.headers.common['x-api-key'] = API_KEY;

fetchBreeds()
  .then(data => createMarkup(data))
  .catch(err => console.log(err));

const refs = {
  selectEl: document.querySelector('.breed-select'),
  divEl: document.querySelector('.cat-info'),
};

refs.selectEl.addEventListener('click', onSelectClick);

function onSelectClick(e) {
  const breed = e.target.value;

  fetchCatByBreed(breed)
    .then(data => createMarkupForCat(data))
    .catch(err => console.error(err));
}

function createMarkup(arr) {
  const markUp = arr.map(({ id, name }) => {
    return `<option value="${id}">${name}</option>`;
  });

  refs.selectEl.innerHTML = markUp;
}

function createMarkupForCat(obj) {
  const { name, temperament, description, reference_image_id } = obj;
  const markUp = `<img src="https://cdn2.thecatapi.com/images/${reference_image_id}.jpg" alt="${name}" width="300"></img>
    <h2>${name}</h2>
    <p>${description}</p>
    <p>${temperament}</p>`;

  return (refs.divEl.innerHTML = markUp);
}
