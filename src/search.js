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

const getPokemon = async function(query) {
  console.log('in get')
  let url = pokeApi + query;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Could not fetch pokemon');
  }
  const data = await response.json();
  console.log('done with get');
  return data
}

const displayPokemon = function(query="") {
  console.log('In display')
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
  console.log('finished display')
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