const getId = function(url) {
  let idString = "";
  let idx = url.length - 2;
  while (url.charAt(idx) !== "/") {
    idString = url.charAt(idx) + idString;
    idx -= 1;
  };
  return parseInt(idString);
}