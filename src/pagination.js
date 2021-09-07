const prevButton = document.querySelector('.page-prev-button');

let currentPage = 1;


prevButton.onclick = function(e) {
  e.preventDefault();
  hi();
}

const bye = function() {
  console.log('bye');
}