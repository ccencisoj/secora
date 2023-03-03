function capitalizeFirstLetter(string) {
  if(typeof string !== "string") return null;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = capitalizeFirstLetter;