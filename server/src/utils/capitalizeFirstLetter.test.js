const capitalizeFirstLetter = require("./capitalizeFirstLetter");

test("Ingresamos una cadena en minusculas", ()=> {
  const result = capitalizeFirstLetter("coffee");
  expect(result).toBe("Coffee");
});

test("Ingresamos una cade en mayusculas", ()=> {
  const result = capitalizeFirstLetter("COFFEE");
  expect(result).toBe("COFFEE");
});

test("Ingresamos una cadena con espacios", ()=> {
  const result = capitalizeFirstLetter("coffee with milk");
  expect(result).toBe("Coffee with milk");
});

test("Ingresamos una cadena vacia", ()=> {
  const result = capitalizeFirstLetter("");
  expect(result).toBe("");
});

test("Ingresamos un valor numero", ()=> {
  const result = capitalizeFirstLetter(234);
  expect(result).toBeNull();
});

test("Ingresamos un valor undefined", ()=> {
  const result = capitalizeFirstLetter(undefined);
  expect(result).toBeNull();
});

test("Ingresamos un valor null", ()=> {
  const result = capitalizeFirstLetter(null);
  expect(result).toBeNull();
});