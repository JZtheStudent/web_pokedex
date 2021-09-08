const pokeApiTypes = 'https://pokeapi.co/api/v2/type/';
const typesList = document.querySelector('.types-list');

let filtersEnabled = false;


const types = {
  'normal': '../images/types/normal.png',
  'fire': '../images/types/fire.png',
  'water': '../images/types/water.png',
  'grass': '../images/types/grass.png',
  'electric': '../images/types/electric.png',
  'ice': '../images/types/ice.png',
  'fighting': '../images/types/fighting.png',
  'poison': '../images/types/poison.png',
  'ground': '../images/types/ground.png',
  'flying': '../images/types/flying.png',
  'psychic': '../images/types/psychic.png',
  'bug': '../images/types/bug.png',
  'rock': '../images/types/rock.png',
  'ghost': '../images/types/ghost.png',
  'dark': '../images/types/dark.png',
  'dragon': '../images/types/dragon.png',
  'steel': '../images/types/steel.png',
  'fairy': '../images/types/fairy.png'
}

let selectedTypes = [];

const populateTypesList = function() {
  Object.keys(types).forEach(type => {
    let typeListItem = document.createElement('li');
    typeListItem.classList.add('type-list-item');

    let typeLink = document.createElement('a');
    typeLink.classList.add('type-link', 'unselected');
    typeLink.onclick = function(e) {
      e.preventDefault();
      handleTypeClicked(typeLink, type);
    }
    
    let typeImg = document.createElement('img');
    typeImg.classList.add('type-img');
    typeImg.setAttribute('src', types[type]);
    typeImg.setAttribute('alt', `${type}-image`);
    
    let typeLabel = document.createElement('h2');
    typeLabel.innerHTML = type;
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
    filtersEnabled = true;
  } else {
    typeLink.classList.add('unselected');
    let idx = selectedTypes.indexOf(name);
    selectedTypes.splice(idx, 1);
    if (!selectedTypes.length) {
      filtersEnabled = false;
      defaultDisplay();
    }
  }
  getPokemonOfTypes();
}

const getPokemonOfTypes = async function() {
  
  let typePromises = await selectedTypes.map(async (type) => {
    let response = await fetch(`${pokeApiTypes}${type}`);
    let data = await response.json();
    return data;
  });
  
  const fullData = await Promise.all(typePromises);
  let allArraysOfPokemon = fullData.map(typeInfo => {
    return typeInfo.pokemon;
  });
  
  
  allArraysOfPokemon.forEach((array) => {
    for (let i = 0; i < array.length; ++i) {
      let name = array[i].pokemon.name;
      let id = getId(array[i].pokemon.url);
      array[i] = {name: name, id: id};
    }
  });

  filterPokemon(allArraysOfPokemon);
}

const filterPokemon = function(allArrays) {
  if (!allArrays.length) {
    pokemon = [];
  } else if (allArrays.length == 1) {
    pokemon = allArrays[0];
  } else {
    let filtered = allArrays[0];
    for (let i = 1; i < allArrays.length; ++i) {
      filtered = intersection(filtered, allArrays[i]);
    }
    pokemon = filtered;
  }
  displayPokemon('home');
}




const intersection = function(a, b) {
  return a.filter(item1 => b.some(item2 => item1.id === item2.id));
};


