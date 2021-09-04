const pokeApi = "https://pokeapi.co/api/v2/pokemon/"

const printSearchText = function() {
  displaySuggestions(this.value);
}

const displaySuggestions = function(value) {
  const html = `<li>${value}</li>`
  suggestions.innerHTML = html;
}

const addItemToList = function(item) {
  const pokemonItem = document.createElement('li');
  pokemonItem.innerHTML = item;
  pokemonItem.classList.add("pokemon-list-item");
  pokemonList.appendChild(pokemonItem);
}

const getAllPokemon = async function(query) {
  let url = pokeApi + query;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Could not fetch pokemon');
  }
  const data = await response.json();
  return data.results;
}

const getAllPokemonData = async function(query) {
  let pokemonData = [];
  await getAllPokemon(query)
    .then(results => {
      Object.values(results).forEach((poke) => {
        getPokemonData(poke.url)
          .then(data => pokemonData.push(data));
      });
    });
  return pokemonData;
}

const getPokemonData = async function(url) {
  let pokeData = {};
  await fetch(url)
    .then(response =>  response.json())
    .then(data => {
      pokeData.name = data.name;
      pokeData.id = data.id;
    });
  return pokeData;
}

const displayPokemon = function(query="") {
  getAllPokemonData(query)
    .then(pokemon => {
      console.log(pokemon);
      console.log(typeof pokemon);
      // const html = pokemon.map(poke => {
        
      //   return `
      //     <li class="pokemon-list-item">
      //       <span class="name">${poke.name}</span>
      //     </li>
      //   `;
      // }).join('');
      // pokemonList.innerHTML = html;
    });
  
}


const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const suggestions = document.querySelector(".suggestions");
const pokemonList = document.querySelector(".pokemon-list");

searchButton.onclick = function(e) {
  e.preventDefault();
  console.log(searchInput.value);
  addItemToList(searchInput.value);
}

window.addEventListener('DOMContentLoaded', () => {
  displayPokemon("?limit=2");
});
