let mainPageContainer = document.querySelector('.main-page-container');
let showPageContainer = document.querySelector('.show-page-container');
let backButton = document.querySelector('.back-button');
let homeButton = document.querySelector('.home-button');

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
  console.log(showStack);
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
  typesHeader.classList.add('types-header');
  typesContainer.appendChild(typesHeader);
  let typesList = document.createElement('ul');
  typesList.classList.add('types-list');
  typesContainer.appendChild(typesList);
  
  let currentTypes = data.types.map(item => item.type.name);
  currentTypes.forEach(type => {
    let typeItem = document.createElement('li');
    typeItem.innerHTML = type;
    typeItem.classList.add('type-item');
    typesList.appendChild(typeItem); 
  });
}