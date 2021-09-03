const pokeApi = "https://pokeapi.co/api/v2/pokemon/"

let pokemon = [];

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





const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const suggestions = document.querySelector(".suggestions");
const pokemonList = document.querySelector(".pokemon-list");


// searchInput.addEventListener('change', printSearchText);
// searchInput.addEventListener('keyup', printSearchText);

searchButton.onclick = function(e) {
  e.preventDefault();
  console.log(searchInput.value);
  addItemToList(searchInput.value);
}