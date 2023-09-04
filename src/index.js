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

// let storedBreeds = [];
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
  // storedBreeds = data;
  return refs.select.insertAdjacentHTML('beforeend',createSelectOption(data))
})
.catch(err=> console.log(err));



function createSelectOption (arr) {
  return arr.map(({id
, name}) => `<option value="${id}">${name}</option>`).join('');
}

function renderCatCard(arr) {
  return arr.map(({name, description,temperament, wikipedia_url}) => `
  <a href="${wikipedia_url}"></a>
  <h2>${name}</h2>
  <p>${description}</p>
  <h3>Temperament</h3>
  <p>${temperament}</p>`).join('');

}
function renderCatUrl(arr) {
  return arr.map(({url 
  }) => `
  <img src="${url}" alt="">
  `).join('');

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

refs.select.addEventListener('change', onSelect);

function onSelect(evt){
  evt.preventDefault();
  breedId = evt.target.value;
  console.log(breedId);

  fetchCatByBreed(breedId).then((data) => {
    console.log(data);
    let breedCat = [];
    const resault = data.map(({breeds, url}) => {
    //  return refs.container.insertAdjacentHTML(renderCatUrl(data))
      breedCat = breeds
     return refs.container.insertAdjacentHTML('beforeend',renderCatCard(breedCat))
    })
    
    
  })
  .catch(err=> console.log(err));
}




  
