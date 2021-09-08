const typeColors = {
  'bug': '#4c6a50',
  'dark': '#5d646e',
  'dragon': '#877a52',
  'electric': '#968f30',
  'fairy': '#964e73',
  'fighting': '#8a6c59',
  'fire': '#8a4b4a',
  'flying': '#36808e',
  'ghost': '#5c4245',
  'grass': '#538e55',
  'ground': '#7a644b',
  'ice': '#5b8f97',
  'normal': '#646464',
  'poison': '#6f5561',
  'psychic': '#71458c',
  'rock': '#66615b',
  'steel': '#656a6d',
  'water': '#46628b'
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