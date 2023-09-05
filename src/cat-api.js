
const BASE_URL = 'https://api.thecatapi.com/v1';
const breeds = '/breeds';
const search = '/images/search';

const keyApi = {
  headers: {
    'x-api-key' : 'live_iNW5yRLQPuv27Qr1jI2atPHfmiX6QreVO2mkLHdj85XCpEeqizfV0zZCMXPsrFAk',
  }
};

function  fetchBreeds() {

  return fetch(`${BASE_URL}${breeds}`,keyApi)
  .then((response) => {
    if(!response.ok){
      throw new Error(response.statusText)
    }
    return response.json();
  })
  
}

function fetchCatByBreed(breedId) {

  return fetch(`${BASE_URL}${search}?breed_ids=${breedId}`,keyApi)
  .then((response) => {
    if(!response.ok){
      throw new Error(response.statusText)
    }
    return response.json();
  })

}

export default {fetchBreeds, fetchCatByBreed }