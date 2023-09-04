import Notiflix from 'notiflix';
// import axios from "axios";

// axios.defaults.headers.common["x-api-key"] = 'live_iNW5yRLQPuv27Qr1jI2atPHfmiX6QreVO2mkLHdj85XCpEeqizfV0zZCMXPsrFAk'


const keyApi = {
  headers: {
    'x-api-key' : 'live_iNW5yRLQPuv27Qr1jI2atPHfmiX6QreVO2mkLHdj85XCpEeqizfV0zZCMXPsrFAk',
  }
};

const BASE_URL = 'https://api.thecatapi.com/v1';
const breeds = '/breeds';
const search = '/images/search';

let storedBreeds = [];
let breedId = '';

const refs ={
  select: document.querySelector('.breed-select'),
  container: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error:  document.querySelector('.error'),
}

function fetchBreeds() {

  return fetch(`${BASE_URL}${breeds}`,keyApi)
  .then((response) => {
    if(!response.ok){
      throw new Error(response.statusText)
    }
    return response.json();
  })
  
}

fetchBreeds().then((data) => {
  storedBreeds = data;
  return refs.select.insertAdjacentHTML('beforeend',createSelectOption(storedBreeds))
})
.catch(err=> console.log(err));



function createSelectOption (arr) {
  return arr.map(({id
, name}) => `<option value="${id}">${name}</option>`).join('');
}

// function renderCatCard(arr) {
//   return arr.map(({name, vetstreet_url
//     = url, description,temperament 
//   }) => `
//   <img class="breed-img-js " src="${url}"  alt="${name}">
//   <h2>${name}</h2>
//   <p>${description}</p>
//   <h3>Temperament</h3>
//   <p>${temperament}</p>`).join('');

// }
 

function fetchCatByBreed(breedId) {

  return fetch(`${BASE_URL}${search}?breed_ids=${breedId}`,keyApi)
  .then((response) => {
    if(!response.ok){
      throw new Error(response.statusText)
    }
    return response.json();
  })

}
// fetchCatByBreed(beng).then((data) => console.log(data))

refs.select.addEventListener('change', onSelect);

function onSelect(evt){
  evt.preventDefault();
  breedId = evt.target.value;
  console.log(breedId);

  fetchCatByBreed(breedId).then((data) => {
    // const breeds = data.map(({}))
    const {url, breeds, wight} = data;
    console.log(url);
    // return refs.container.insertAdjacentHTML('beforeend',renderCatCard(data))
  })
  .catch(err=> console.log(err));
}

// function fetchCatByBreed(breedId){
  
// }


  
