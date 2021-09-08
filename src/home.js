const pokeApi = "https://pokeapi.co/api/v2/pokemon/";

let pokemon = [];

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
    pokemon = allPokeData;

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
const displayPokemon = async function(poke = pokemon) {
  displayCurrentPage();
  clearPokeList();
  
  await poke.forEach(poke => {
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

  validatePrevButton();
  validateNextButton();
  
}

const defaultDisplay = async function() {
  pokemon = await getPokemonDataFromQuery(`?limit=${itemsPerPage}`)
    .then(() => {
      currentPage = 1;
      console.log(pokemon);
      displayPokemon();
    });
  
}

const goToPokemonDetails = function(name) {
  window.location = `./pokemon_details.html?pokemon=${name}`;
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


window.addEventListener('DOMContentLoaded', () => {
  currentPage = 1;
  selectedTypes = [];

  populateTypesList();
  defaultDisplay();
 
});

