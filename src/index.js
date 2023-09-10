import Notiflix from 'notiflix';
// import axios from "axios";
import {fetchBreeds, fetchCatByBreed } from './cat-api';


// let storedBreeds = [];
let breedId = '';

const refs ={
  select: document.querySelector('.breed-select'),
  container: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error:  document.querySelector('.error'),
}

refs.loader.classList.add('js-hidden');
refs.error.classList.add('js-hidden');
refs.select.classList.add('js-hidden');

// Notiflix.Loading.circle(refs.loader);
Notiflix.Block.arrows('.loader');

document.addEventListener('click', onSelection);

function onSelection(){
  refs.loader.classList.remove('js-hidden');
  

  fetchBreeds().then((data) => {
    refs.loader.classList.add('js-hidden');
    refs.select.classList.remove('js-hidden');
    document.removeEventListener('click', onSelection)
    return refs.select.insertAdjacentHTML('beforeend',createSelectOption(data));
  })
  .catch(err=> {
    refs.loader.classList.add('js-hidden');
    refs.select.classList.add('js-hidden');
    refs.error.classList.remove('js-hidden');
    Notiflix.Block.remove('.loader');
  });

  

}


// fetchBreeds().then((data) => {
//   // refs.loader.classList.add('js-hidden');
//   return refs.select.insertAdjacentHTML('beforeend',createSelectOption(data));
// })
// .catch(err=> {
//   refs.loader.classList.add('js-hidden');
//   refs.select.classList.add('js-hidden');
//   refs.error.classList.remove('js-hidden');
//   Notiflix.Block.remove('.loader');
// });

refs.select.addEventListener('change', onCatBreedSelection);

function onCatBreedSelection(evt){
  evt.preventDefault();

  refs.loader.classList.remove('js-hidden');
  refs.container.classList.add('js-hidden');
  
  breedId = evt.target.value;
  console.log(breedId);
  refs.container.innerHTML = '';

  fetchCatByBreed(breedId).then((data) => {
    refs.container.classList.remove('js-hidden');
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
  .catch(err=> {
    refs.loader.classList.add('js-hidden');
    refs.select.classList.add('js-hidden');
    refs.error.classList.remove('js-hidden');
    Notiflix.Block.remove('.loader');
  });

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




  
