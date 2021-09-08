const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");


const searchForPokemon = async function(searchName) {
  const url = pokeApi + searchName + '/';
 
    const response = await fetch(url);
    if (!response.ok) {
      flashError('cannot find pokemon');
    } else {
      const data = await response.json();
      let pokeData = {name: searchName, id: data.id}
      currentPage = 1;
      displayPokemon('home', [pokeData]);
    }
}

searchButton.onclick = function(e) {
  e.preventDefault();
  if (searchInput.value === "") {
    defaultDisplay();
  } else {
    searchForPokemon(searchInput.value.toLowerCase());
    searchInput.value = "";
  }
}



