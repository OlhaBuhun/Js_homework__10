import Notiflix from 'notiflix';
// import axios from "axios";
import API from './cat-api';


// let storedBreeds = [];
let breedId = '';

const refs ={
  select: document.querySelector('.breed-select'),
  container: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error:  document.querySelector('.error'),
  // list: document.querySelector('.js-list')
}

refs.loader.classList.add('js-hidden');
refs.error.classList.add('js-hidden');


// function breedSelection (){

//   refs.loader.classList.remove('js-hidden');

 
// }

API.fetchBreeds().then((data) => {
  refs.loader.classList.add('js-hidden');
  return refs.select.insertAdjacentHTML('beforeend',createSelectOption(data));
})
.catch(err=> console.log(err));


refs.select.addEventListener('click', onSelect);

function onSelect(evt){
  evt.preventDefault();
  refs.loader.classList.remove('js-hidden');
  // refs.container.classList.add('js-hidden');
  
  breedId = evt.target.value;
  console.log(breedId);
  refs.container.innerHTML = '';

  API.fetchCatByBreed(breedId).then((data) => {
    // refs.container.classList.remove('js-hidden');
    console.log(data);
    let breedCat = [];

    const resault = data.map(({breeds, url}) => {
    let image = document.createElement('img');
    image.classList.add('img-cat');
     image.src = `${url}`
     refs.container.appendChild(image)
     
      breedCat = breeds
     refs.container.insertAdjacentHTML('beforeend',renderCatCard(breedCat))
     refs.loader.classList.add('js-hidden');
    })
  })
  .catch(err=> console.log(err))

}

function createSelectOption (arr) {
  return arr.map(({id
, name}) => `<option value="${id}">${name}</option>`).join('');
}

function renderCatCard(arr) {
  return arr.map(({name, description,temperament}) => `
  <ul class="js-list">
  <li>
  <h2>${name}</h2>
  <p>${description}</p>
  <h3>Temperament</h3>
  <p>${temperament}</p>
  </li>
  </ul>
  `).join('');

}




  
