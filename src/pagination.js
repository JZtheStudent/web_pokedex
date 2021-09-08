const prevButton = document.querySelector('.page-prev-button');
const nextButton = document.querySelector('.page-next-button');


let currentPage = 1;
let itemsPerPage = 50;

prevButton.onclick = function(e) {
  e.preventDefault();
  currentPage--;
  updateList();
}

nextButton.onclick = function(e) {
  e.preventDefault();
  currentPage++;
  updateList();
}

const updateList = async function() {
  let offset = (currentPage - 1) * itemsPerPage;
  if (!filtersEnabled) {
    await getPokemonDataFromQuery(`?offset=${offset}&limit=${itemsPerPage}`)
    .then(() => {
      displayPokemon('home');
    });
  } else {
    currentPokemon = pokemon.slice(offset, offset + itemsPerPage);
    displayPokemon('home', currentPokemon);
  }
  
  
}

const validatePrevButton = function() {
  if (currentPage === 1) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }
}

const validateNextButton = function() {
  let listLength = document.querySelectorAll(".pokemon-list li").length;
  if (listLength < 50) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
}
