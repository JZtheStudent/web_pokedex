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