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
  // console.log(data.results);
  return data.results;
}

const getAllPokemonData = async function(query) {
  
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

const displayPokemon = async function(query="") {
 
  let pokemon = await getAllPokemonData(query);
  
  pokemon.forEach(poke => {
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
    pokemonList.appendChild(pokeListItem);
  
  });
  

}


const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const suggestions = document.querySelector(".suggestions");
const pokemonList = document.querySelector(".pokemon-list");
const pokemonListItem = document.querySelectorAll(".pokemon-list-item");


searchButton.onclick = function(e) {
  e.preventDefault();
  console.log(searchInput.value);
  addItemToList(searchInput.value);
}

pokemonListItem.onclick = function(e) {
  console.log('hi');
  console.log(this.id);
}

window.addEventListener('DOMContentLoaded', () => {
  displayPokemon("?limit=10");
});

