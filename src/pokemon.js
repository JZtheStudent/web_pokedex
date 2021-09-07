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
  console.log(data);
}

loadPage();