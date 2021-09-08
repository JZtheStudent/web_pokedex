const typesList = document.querySelector('.types-list');

const types = [
  {name: 'normal', src: '../images/types/normal.png'},
  {name: 'fire', src: '../images/types/fire.png'},
  {name: 'water', src: '../images/types/water.png'},
  {name: 'grass', src: '../images/types/grass.png'},
  {name: 'electric', src: '../images/types/electric.png'},
  {name: 'ice', src: '../images/types/ice.png'},
  {name: 'fighting', src: '../images/types/fighting.png'},
  {name: 'poison', src: '../images/types/poison.png'},
  {name: 'ground', src: '../images/types/ground.png'},
  {name: 'flying', src: '../images/types/flying.png'},
  {name: 'psychic', src: '../images/types/psychic.png'},
  {name: 'bug', src: '../images/types/bug.png'},
  {name: 'rock', src: '../images/types/rock.png'},
  {name: 'ghost', src: '../images/types/ghost.png'},
  {name: 'dark', src: '../images/types/dark.png'},
  {name: 'dragon', src: '../images/types/dragon.png'},
  {name: 'steel', src: '../images/types/steel.png'},
  {name: 'fairy', src: '../images/types/fairy.png'}
]

let selectedTypes = [];

const populateTypesList = function() {
  types.forEach(type => {
    let typeListItem = document.createElement('li');
    typeListItem.classList.add('type-list-item');

    let typeLink = document.createElement('a');
    typeLink.classList.add('type-link', 'unselected');
    typeLink.onclick = function(e) {
      e.preventDefault();
      handleTypeClicked(typeLink, type.name);
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

const handleTypeClicked = function(typeLink, name) {
  if (typeLink.classList.contains('unselected')) {
    typeLink.classList.remove('unselected');
    selectedTypes.push(name);
  } else {
    typeLink.classList.add('unselected');
    let idx = selectedTypes.indexOf(name);
    selectedTypes.splice(idx, 1);
  }
  console.log(selectedTypes);
}