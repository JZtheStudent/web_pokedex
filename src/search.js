
const printSearchText = function() {
  displaySuggestions(this.value);
  
}

const displaySuggestions = function(value) {
  const html = `<li>${value}</li>`
  suggestions.innerHTML = html;
}





const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener('change', printSearchText);
searchInput.addEventListener('keyup', printSearchText);