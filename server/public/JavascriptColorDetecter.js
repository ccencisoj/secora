function whatIsColor(hslColor) {
  if(!(Array.isArray(value) && value.length === 3)) return;

  //colorList() es remplazado por la lista de colores [color1, ...];
  const colors = colorList();
    
  const results = colors.filter(({ range })=> 
    hslColor[0] >= range[0][0] && hslColor[0] <= range[1][0]);
  return {results};
}