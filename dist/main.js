/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./search */ \"./src/search.js\");\n/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_search__WEBPACK_IMPORTED_MODULE_0__);\n\n\nwindow.addEventListener('DOMContentLoaded', () => {\n  console.log('DOM loaded');\n  \n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/search.js":
/*!***********************!*\
  !*** ./src/search.js ***!
  \***********************/
/***/ (() => {

eval("const pokeApi = \"https://pokeapi.co/api/v2/pokemon/\"\n\nconst printSearchText = function() {\n  displaySuggestions(this.value);\n}\n\nconst displaySuggestions = function(value) {\n  const html = `<li>${value}</li>`\n  suggestions.innerHTML = html;\n}\n\nconst addItemToList = function(item) {\n  const pokemonItem = document.createElement('li');\n  pokemonItem.innerHTML = item;\n  pokemonItem.classList.add(\"pokemon-list-item\");\n  pokemonList.appendChild(pokemonItem);\n}\n\nconst getAllPokemon = async function(query) {\n  let url = pokeApi + query;\n  const response = await fetch(url);\n  if (!response.ok) {\n    throw new Error('Could not fetch pokemon');\n  }\n  const data = await response.json();\n  return data.results;\n}\n\nconst getAllPokemonData = async function(query) {\n  let pokemonData = [];\n  await getAllPokemon(query)\n    .then(results => {\n      Object.values(results).forEach((poke) => {\n        getPokemonData(poke.url)\n          .then(data => pokemonData.push(data));\n      });\n    });\n  return pokemonData;\n}\n\nconst getPokemonData = async function(url) {\n  let pokeData = {};\n  await fetch(url)\n    .then(response =>  response.json())\n    .then(data => {\n      pokeData.name = data.name;\n      pokeData.id = data.id;\n    });\n  return pokeData;\n}\n\nconst displayPokemon = function(query=\"\") {\n  getAllPokemonData(query)\n    .then(pokemon => {\n      console.log(pokemon);\n      console.log(typeof pokemon);\n      // const html = pokemon.map(poke => {\n        \n      //   return `\n      //     <li class=\"pokemon-list-item\">\n      //       <span class=\"name\">${poke.name}</span>\n      //     </li>\n      //   `;\n      // }).join('');\n      // pokemonList.innerHTML = html;\n    });\n  \n}\n\n\nconst searchInput = document.querySelector(\".search-input\");\nconst searchButton = document.querySelector(\".search-button\");\nconst suggestions = document.querySelector(\".suggestions\");\nconst pokemonList = document.querySelector(\".pokemon-list\");\n\nsearchButton.onclick = function(e) {\n  e.preventDefault();\n  console.log(searchInput.value);\n  addItemToList(searchInput.value);\n}\n\nwindow.addEventListener('DOMContentLoaded', () => {\n  displayPokemon(\"?limit=2\");\n});\n\n\n//# sourceURL=webpack:///./src/search.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;