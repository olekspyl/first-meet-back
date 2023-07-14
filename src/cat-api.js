const BASE_URL = 'https://api.thecatapi.com/v1';

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
      throw new Error(resp.statusCode);
    }
    return resp.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
