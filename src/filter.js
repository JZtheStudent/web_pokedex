const typesList = document.querySelector('.types-list');

const types = [
  {name: 'normal'},
  {name: 'fire'},
  {name: 'water'},
  {name: 'grass'},
  {name: 'electric'},
  {name: 'ice'},
  {name: 'fighting'},
  {name: 'poison'},
  {name: 'ground'},
  {name: 'flying'},
  {name: 'psychic'},
  {name: 'bug'},
  {name: 'rock'},
  {name: 'ghost'},
  {name: 'dark'},
  {name: 'dragon'},
  {name: 'steel'},
  {name: 'fairy'}
]

let selectedTypes = [];

const populateTypesList = function() {
  types.forEach(type => {
    let typeListItem = document.createElement('li');
    typeListItem.classList.add('type-list-item');

    let typeLink = document.createElement('a');
    typeLink.classList.add('type-link');
    typeLink.onclick = function(e) {
      e.preventDefault();
      console.log(type.name);
    }

    let typeImg = document.createElement('img');
    typeImg.classList.add('type-img');
    typeImg.setAttribute('src', type.src);
    typeImg.setAttribute('alt', `${type.name}-image`);
    
    let typeLabel = document.createElement('h2');
    typeLabel.innerHTML = type.name;
    typeLabel.classList.add('type-label')
    
    typeLink.appendChild(typeImg);
    typeListItem.appendChild(typeLink);
    typeListItem.appendChild(typeLabel);
    typesList.appendChild(typeListItem);
  });
}
