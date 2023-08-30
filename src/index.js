import Notiflix from 'notiflix';
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = 'live_iNW5yRLQPuv27Qr1jI2atPHfmiX6QreVO2mkLHdj85XCpEeqizfV0zZCMXPsrFAk'


// const keyApi = {
//    'x-api-key' : 'live_iNW5yRLQPuv27Qr1jI2atPHfmiX6QreVO2mkLHdj85XCpEeqizfV0zZCMXPsrFAk' ,
// };

const url = 'https://api.thecatapi.com/v1/breeds';
let storedBreeds = [];

const refs ={
  select: document.querySelector('.breed-select'),
  container: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error:  document.querySelector('.error'),
}
