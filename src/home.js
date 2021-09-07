const pokeApi = "https://pokeapi.co/api/v2/pokemon/";
let currentPage = 1;

const getAllPokemon = async function(query) {
  let url = pokeApi + query;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Could not fetch pokemon');
  }
  const data = await response.json();
  return data.results;
}

const getPokemonDataFromQuery = async function(query) {
  
  const allPokeData = await getAllPokemon(query)
    .then(async (results) => {
  
      const pokePromises = results.map(async (poke) => {
        let data = await getPokemonData(poke.url);
        return data;
        });
      const fullData = await Promise.all(pokePromises);
      return fullData;
    });
    return allPokeData;


}

const getPokemonData = async function(url) {
  
  let pokeData = await fetch(url)
    .then(response =>  response.json())
    .then(data => {
      let parsedData = {name: data.name, id: data.id};
      return parsedData;
    });
  return pokeData;
}

const getPokemonImage = function(pokeImage, id) {

  pokeImage.setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`);
}

// Takes in an array
const displayPokemon = async function(pokemon) {
  
  displayCurrentPage();

  clearPokeList();
  
  pokemon.forEach(poke => {
    let pokeLink = document.createElement('a')
    pokeLink.onclick = function(event) {
      event.preventDefault();
      goToPokemonDetails(poke.name);
    }
    
    let pokeListItem = document.createElement('li')
    pokeListItem.classList.add('pokemon-list-item');
    pokeListItem.id = poke.id;
    
    let pokeImage = document.createElement('img');
    pokeImage.setAttribute('src', '');
    getPokemonImage(pokeImage, poke.id);
    pokeImage.setAttribute('alt', `${poke.name}-image`);
    pokeImage.classList.add('poke-image');
    
    
    let pokeName = document.createElement('h1');
    pokeName.innerHTML = `${poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}`;
    
    pokeListItem.appendChild(pokeImage);
    pokeListItem.appendChild(pokeName);
    pokeLink.appendChild(pokeListItem);
    pokemonList.appendChild(pokeLink);
  
  });
}

const defaultDisplay = async function() {
  let defaultPokemon = await getPokemonDataFromQuery("?limit=50")
  currentPage = 1;
  displayPokemon(defaultPokemon);
}

const goToPokemonDetails = function(name) {
  window.location = `./pokemon_details.html?pokemon=${name}`;
}

const searchForPokemon = async function(searchName) {
  const url = pokeApi + searchName + '/';
 
    const response = await fetch(url);
    if (!response.ok) {
      flashError('cannot find pokemon');
    } else {
      const data = await response.json();
      let pokeData = {name: searchName, id: data.id}
      currentPage = 1;
      displayPokemon([pokeData]);
      
    }
    
    
}

const flashError = function(message) {
  console.log(message);
}

const clearPokeList = function() {
  while (pokemonList.firstChild) {
    pokemonList.removeChild( pokemonList.firstChild);
  }
}

const displayCurrentPage = function() {
  let currentPageLabel = document.querySelector('.page-number');
  currentPageLabel.innerHTML = currentPage;
}


const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const suggestions = document.querySelector(".suggestions");
const pokemonList = document.querySelector(".pokemon-list");


searchButton.onclick = function(e) {
  e.preventDefault();
  if (searchInput.value === "") {
    defaultDisplay();
  } else {
    searchForPokemon(searchInput.value.toLowerCase());
    searchInput.value = "";
  }
}




window.addEventListener('DOMContentLoaded', () => {
  currentPage = 1;
  console.log(currentPage);
  defaultDisplay();
});

