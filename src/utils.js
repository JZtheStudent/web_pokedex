const typeColors = {
  'bug': 'rgb(76, 106, 80, .5)',
  'dark': 'rgb(93, 100, 110, .5)',
  'dragon': 'rgb(135, 122, 82, .5)',
  'electric': 'rgb(150, 143, 48, .5)',
  'fairy': 'rgb(150, 78, 115, .5)',
  'fighting': 'rgb(138, 108, 89, .5)',
  'fire': 'rgb(138, 75, 74, .5)',
  'flying': 'rgb(54, 128, 142, .5)',
  'ghost': 'rgb(92, 66, 69, .5)',
  'grass': 'rgb(83, 142, 85, .5)',
  'ground': 'rgb(122, 100, 75, .5)',
  'ice': 'rgb(91, 143, 151, .5)',
  'normal': 'rgb(100, 100, 100, .5)',
  'poison': 'rgb(111, 85, 97, .5)',
  'psychic': 'rgb(113, 69, 140, .5)',
  'rock': 'rgb(102, 97, 91, .5)',
  'steel': 'rgb(101, 106, 109, .5)',
  'water': 'rgb(70, 98, 139, .5)'
}

const getId = function(url) {
  let idString = "";
  let idx = url.length - 2;
  while (url.charAt(idx) !== "/") {
    idString = url.charAt(idx) + idString;
    idx -= 1;
  };
  return parseInt(idString);
}

const removeAllChildNodes = function(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const clearPokeList = function(list) {
  while (list.firstChild) {
    list.removeChild( list.firstChild);
  }
}

const fetchTypes = async function(id) {
  let response = await fetch(`${pokeApi}${id}`);
  let data = await response.json();
  console.log(data);
}

const getTypes = function(data) {
  let pokeTypes = data.types;
  for (let i = 0; i < pokeTypes.length; ++i) {
    pokeTypes[i] = pokeTypes[i].type.name;
  };
  return pokeTypes;
}