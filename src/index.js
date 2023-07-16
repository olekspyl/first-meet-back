import { fetchBreeds, fetchCatByBreed } from './cat-api';
import axios from 'axios';
import Choices from 'choices.js';
import '../node_modules/choices.js/public/assets/styles/choices.min.css';

const API_KEY =
  'live_BaCgLKDd52OE1h5JkR1zxb37HAgSWVxtK59cjorfqr1rmfli33qg02XTqa5bFmri';

axios.defaults.headers.common['x-api-key'] = API_KEY;

const refs = {
  selectEl: document.querySelector('.breed-select'),
  divEl: document.querySelector('.cat-info'),
  errorEl: document.querySelector('.error'),
  loaderEl: document.querySelector('.loader'),
};

refs.selectEl.addEventListener('change', onSelectChange);

refs.selectEl.setAttribute('hidden', 'hidden');
refs.errorEl.setAttribute('hidden', 'hidden');
refs.divEl.setAttribute('hidden', 'hidden');
// refs.loaderEl.setAttribute('hidden', 'hidden');

fetchBreeds()
  .then(data => {
    createMarkup(data);
    selectStyle();
  })
  .catch(err => console.log(err));

function onSelectChange() {
  // const breed = e.target.value;
  const breed = this.value;
  // refs.loaderEl.hidden = false;
  refs.loaderEl.style.display = 'block';

  fetchCatByBreed(breed)
    .then(data => {
      createMarkupForCat(data);
      // refs.loaderEl.hidden = true;
    })
    .then(() => {
      refs.loaderEl.style.display = 'none';
    })
    .catch(err => console.error(err));
}

function createMarkup(arr) {
  const markUp = arr.map(({ id, name }) => {
    return `<option value="${id}">${name}</option>`;
  });
  refs.selectEl.hidden = false;
  refs.selectEl.innerHTML = markUp;
}

function createMarkupForCat(obj) {
  const { name, temperament, description, reference_image_id } = obj;
  const markUp = `<img src="https://cdn2.thecatapi.com/images/${reference_image_id}.jpg" alt="${name}" width="300"></img>
    <h2>${name}</h2>
    <p>${description}</p>
    <p>${temperament}</p>`;
  refs.divEl.hidden = false;
  refs.divEl.innerHTML = markUp;
}

export { refs };

function selectStyle() {
  const choices = new Choices(refs.selectEl, { allowHTML: false });
}
