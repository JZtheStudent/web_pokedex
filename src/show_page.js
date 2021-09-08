let testButton = document.querySelector('.test-button');
let mainPageContainer = document.querySelector('.main-page-container');
testButton.onclick = function(e) {
  e.preventDefault();
  if (mainPageContainer.classList.contains('hidden')) {
    mainPageContainer.classList.remove('hidden');
  } else {
    mainPageContainer.classList.add('hidden');
  }
  console.log(mainPageContainer.classList);
}