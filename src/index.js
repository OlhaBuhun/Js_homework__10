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
  list: document.querySelector('.js-list')
}



API.fetchBreeds().then((data) => {
  // storedBreeds = data;
  return refs.select.insertAdjacentHTML('beforeend',createSelectOption(data))
})
.catch(err=> console.log(err));


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


refs.select.addEventListener('change', onSelect);

function onSelect(evt){
  evt.preventDefault();
  // refs.container.remove()
  
  breedId = evt.target.value;
  console.log(breedId);

  API.fetchCatByBreed(breedId).then((data) => {
    console.log(data);
    let breedCat = [];

    const resault = data.map(({breeds, url}) => {
    let image = document.createElement('img');
    image.classList.add('img-cat');
     image.src = `${url}`
     refs.container.appendChild(image)
     
      breedCat = breeds
     return refs.container.insertAdjacentHTML('beforeend',renderCatCard(breedCat))
    })
  })
  .catch(err=> console.log(err))
//   .finally(()=>{
//     refs.container.remove()
//   })
}




  
