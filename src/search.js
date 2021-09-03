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

const getPokemon = async function(query) {
  let url = pokeApi + query;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Could not fetch pokemon');
  }
  const data = await response.json();
  return data
}

const displayPokemon = function(query="") {
  pokemon = [];
  getPokemon(query)
    .then(data => {
      pokemon.push(...data.results);
      const html = pokemon.map(poke => {
        return `
          <li class="pokemon-list-item">
            <span >${poke.name}</span>
          </li>
        `;
      }).join('');
      pokemonList.innerHTML = html;
    })
    .catch(error => {
      console.error('Something wrong with fetch', error);
    })
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

displayPokemon("?limit=5");