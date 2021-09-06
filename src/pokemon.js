const pokeApi = "https://pokeapi.co/api/v2/pokemon/";


let urlParams = new URLSearchParams(window.location.search);
const pokeName = urlParams.get('pokemon');

console.log(pokeName);

const getPokeInfo = async function() {
  const response = await fetch(`${pokeApi}${pokeName}`);
  if (!response.ok) {
    throw new Error('Could not fetch pokemon');
  }
  const data = await response.json();
  return data;
}


const loadPage = async function() {
  
  let info = await getPokeInfo()
    .then(results => {
      console.log(results);
      displayPage();
    });
  

}

const displayPage = function() {
  displayTitle();
  displayImage();
  displayInfo();
}

const displayTitle = function() {

}

const displayImage = function() {

}

const displayInfo = function() {

}

displayPage();