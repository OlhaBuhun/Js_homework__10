import Notiflix from 'notiflix';
import axios from "axios";

// axios.defaults.headers.common["x-api-key"] = 'live_iNW5yRLQPuv27Qr1jI2atPHfmiX6QreVO2mkLHdj85XCpEeqizfV0zZCMXPsrFAk'


const keyApi = {
  headers: {
    'x-api-key' : 'live_iNW5yRLQPuv27Qr1jI2atPHfmiX6QreVO2mkLHdj85XCpEeqizfV0zZCMXPsrFAk',
  }
};

const BASE_URL = 'https://api.thecatapi.com/v1';
const breeds = '/breeds';

let storedBreeds = [];
// breeds

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
  // console.log(storedBreeds);
  return refs.select.insertAdjacentHTML('beforeend',createSelectOption(storedBreeds))
})
.catch(err=> console.log(err));


function createSelectOption (arr) {
  return arr.map(({id
, name}) => `<option value="${id}">${name}</option>`).join('');
}
function createMarkup(arr) {

}
  
