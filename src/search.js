

searchButton.onclick = function(e) {
  e.preventDefault();
  if (searchInput.value === "") {
    defaultDisplay();
  } else {
    searchForPokemon(searchInput.value.toLowerCase());
    searchInput.value = "";
  }
}



