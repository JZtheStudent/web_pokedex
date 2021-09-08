const pokeApi = "https://pokeapi.co/api/v2/pokemon/";


let urlParams = new URLSearchParams(window.location.search);
const pokeName = urlParams.get('pokemon');

const getPokeInfo = async function() {
  const response = await fetch(`${pokeApi}${pokeName}`);
  if (!response.ok) {
    throw new Error('Could not fetch pokemon');
  }
  const data = await response.json();
  return data;
}


const loadPage = async function() {
  
  await getPokeInfo()
    .then(results => {
      displayBasicInfo(results);
      return results.species.url;
    }).then(species_url => {
      loadSpecies(species_url);
    });
  

}

const displayBasicInfo = function(data) {
  displayTitle(data);
  displayImage(data);
  displayTypes(data);
}

const displayTitle = function(data) {
  let title = document.querySelector('.page-title');
  let name = data.name;
  let nameString = name.charAt(0).toUpperCase() + name.slice(1);
  title.innerHTML = `${nameString}`;
}

const displayImage = function(data) {
  let imageContainer = document.querySelector('.poke-image-container')
  
  let image = document.createElement('img');
  image.classList.add('poke-image');
  image.setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`)
  imageContainer.appendChild(image);
}

const displayTypes = function(data) {
  let typesContainer = document.querySelector('.types-container');
  let typesHeader = document.createElement('h3');
  typesHeader.innerHTML = 'Types';
  typesHeader.classList.add('types-header');
  typesContainer.appendChild(typesHeader);
  let typesList = document.createElement('ul');
  typesList.classList.add('types-list');
  typesContainer.appendChild(typesList);
  
  types = data.types.map(item => item.type.name);
  types.forEach(type => {
    let typeItem = document.createElement('li');
    typeItem.innerHTML = type;
    typeItem.classList.add('type-item');
    typesList.appendChild(typeItem); 
  });
}

const loadSpecies = async function(species_url) {
  const response = await fetch(species_url);
  if (!response.ok) {
    throw new Error('Could not fetch species');
  }
  const data = await response.json();
  loadEvolutionChain(data.evolution_chain.url);
}

const loadEvolutionChain = async function(evo_url) {
  const response = await fetch(evo_url);
  if (!response.ok) {
    throw new Error('Could not fetch evolution chain');
  }
  const data = await response.json();
  getEvolutionChain(data);
}

const getEvolutionChain = function(data) {
  let speciesList = [data.chain.species]
  let evolutionChain = data.chain.evolves_to;
  evolutionChain.forEach(evo => {
    speciesList.push(evo.species);
    evo.evolves_to.forEach(evo_evo => {
      speciesList.push(evo_evo.species);
    });
  }); 
  speciesList.forEach(species => {
    species['id'] = getId(species.url);
  });
  displayEvolutionChain(speciesList);

}

const displayEvolutionChain = function(speciesList) {
  console.log(speciesList);
  let evoList = document.querySelector('.evo-list');
  speciesList.forEach(species => {
    let evoLink = document.createElement('a');
    evoLink.onclick = function(event) {
      event.preventDefault();
      goToPokemonDetails(species.name);
    }
    
    let evoListItem = document.createElement('li');
    evoListItem.classList.add('evo-list-item');
    evoListItem.id = species.id;
  
    let evoImage = document.createElement('img');
    evoImage.setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${species.id}.png`) 
    evoImage.setAttribute('alt', `${species.name}-image`);
    evoImage.classList.add('evo-image');

    let evoName = document.createElement('h1');
    evoName.innerHTML = `${species.name.charAt(0).toUpperCase() + species.name.slice(1)}`;
  
    evoListItem.appendChild(evoImage);
    evoListItem.appendChild(evoName);
    evoLink.appendChild(evoListItem);
    evoList.appendChild(evoLink);

  });
}

const goToPokemonDetails = function(name) {
  window.location = `./pokemon_details.html?pokemon=${name}`;
}

const getId = function(url) {
  let idString = "";
  let idx = url.length - 2;
  while (url.charAt(idx) !== "/") {
    idString = url.charAt(idx) + idString;
    idx -= 1;
  };
  return parseInt(idString);
}

let goHomeButton = document.querySelector('.go-home-button');
goHomeButton.onclick = function(e) {
  e.preventDefault();
  window.location = './index.html';
}

loadPage();