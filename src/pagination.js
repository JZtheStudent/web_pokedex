const prevButton = document.querySelector('.page-prev-button');
const nextButton = document.querySelector('.page-next-button');


let currentPage = 1;


prevButton.onclick = function(e) {
  e.preventDefault();

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
