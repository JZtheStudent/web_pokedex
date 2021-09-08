let mainPageContainer = document.querySelector('.main-page-container');
let showPageContainer = document.querySelector('.show-page-container');
let backButton = document.querySelector('.back-button');
let homeButton = document.querySelector('.home-button');
let showEvoList = document.querySelector('.show-evo-list')

const pokeApiSpecies = 'https://pokeapi.co/api/v2/pokemon-species/'
let showStack = [];

backButton.onclick = function(e) {
  e.preventDefault();
  showStack.pop()
  updateShowPage();
}

homeButton.onclick = function(e) {
  e.preventDefault();
  showStack = [];
  updateShowPage();
}

const toggleShowPage = function() {
  if (mainPageContainer.classList.contains('hidden')) {
    mainPageContainer.classList.remove('hidden');
    showPageContainer.classList.add('hidden');
  } else {
    mainPageContainer.classList.add('hidden');
    showPageContainer.classList.remove('hidden');
  }
}

const addToShowStack = function(poke) {
  if (!showStack.length) toggleShowPage();
  showStack.push(poke);
  updateShowPage();
}

const updateShowPage = function() {
  if (!showStack.length) {
    toggleShowPage();
  } else {
    let currentPoke = showStack[showStack.length - 1];
    loadPage(currentPoke);
  }
}

const getPokeInfo = async function(poke) {
  const response = await fetch(`${pokeApi}${poke.name}`)
  if (!response.ok) {
    throw new Error('Could not fetch pokemon');
  }
  const data = await response.json();
  return data;
}

const loadPage = async function(poke) {
  await getPokeInfo(poke)
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
  let title = document.querySelector('.show-page-title');
  let name = data.name;
  let nameString = name.charAt(0).toUpperCase() + name.slice(1);
  title.innerHTML = `${nameString}`;  
}

const displayImage = function(data) {
  let imageContainer = document.querySelector('.show-poke-image-container')
  removeAllChildNodes(imageContainer);
  let image = document.createElement('img');
  image.classList.add('show-poke-image');
  image.setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`)
  imageContainer.appendChild(image);
}

const displayTypes = function(data) {
  let typesContainer = document.querySelector('.show-poke-types-container');
  removeAllChildNodes(typesContainer);
  let typesHeader = document.createElement('h3');
  typesHeader.innerHTML = 'Types';
  typesHeader.classList.add('show-types-header');
  typesContainer.appendChild(typesHeader);

  let typesList = document.createElement('ul');
  typesList.classList.add('show-types-list');
  typesContainer.appendChild(typesList);
  
  let currentTypes = data.types.map(item => item.type.name);
  currentTypes.forEach(type => {
    let typeItem = document.createElement('li');
    typeItem.classList.add('show-type-item');
    
    let typeImg = document.createElement('img');
    typeImg.setAttribute('src', types[type]);
    typeImg.setAttribute('alt', `${type}-image`)
    typeImg.classList.add('show-type-img')

    let typeItemText = document.createElement('p');
    typeItemText.innerHTML = type;
    typeItemText.classList.add('show-type-item-text');
    
    typeItem.appendChild(typeImg);
    typeItem.appendChild(typeItemText);

    typesList.appendChild(typeItem); 
  });
}

const displayFlavorText = function(flavorTextString) {
  let flavorText = document.querySelector('.flavor-text');
  flavorText.innerHTML = flavorTextString;
}


const loadSpecies = async function(species_url) {
  const response = await fetch(species_url);
  if (!response.ok) {
    throw new Error('Could not fetch species');
  }
  const data = await response.json();
  displayFlavorText(data.flavor_text_entries[0].flavor_text);
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
  displayPokemon('show', speciesList);
}


