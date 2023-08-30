import Notiflix from 'notiflix';
import axios from "axios";

// axios.defaults.headers.common["x-api-key"] = 'live_iNW5yRLQPuv27Qr1jI2atPHfmiX6QreVO2mkLHdj85XCpEeqizfV0zZCMXPsrFAk'


const keyApi = {
  headers: {
    'x-api-key' : 'live_iNW5yRLQPuv27Qr1jI2atPHfmiX6QreVO2mkLHdj85XCpEeqizfV0zZCMXPsrFAk',
  }
};

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';

let storedBreeds = [];
// breeds

const refs ={
  select: document.querySelector('.breed-select'),
  container: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error:  document.querySelector('.error'),
}

function fetchBreeds() {

  return fetch(BASE_URL,keyApi)
  .then((response) => {
    if(!response.ok){
      throw new Error(response.statusText)
    }
    return response.json();
  })
  
}
fetchBreeds().then((data) => {
  data = data.filter(img=> img.image?.url!=null)
   
  storedBreeds = data;
  console.log(storedBreeds);
  
  // for (let i=0; storedBreeds.length; i ++){
  //   const breed = storedBreeds[i];
  //   // console.log(i);
  // }
})
.catch(err=> console.log(err))
// fetch(BASE_URL,keyApi)
//   .then((response) => response.json ).then(console.log)
  
