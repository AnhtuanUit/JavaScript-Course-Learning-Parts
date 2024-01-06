"use strict";
/*
// Functions
function logger() {
  console.log("My name is Tuan");
}

// calling / running / invoking function
logger();
logger();
logger();

function fruitProgress(apples, oranges) {
  const fruit = `Juice with ${apples} apples and ${oranges} oranges.`;
  return fruit;
}

const appleJuice = fruitProgress(3, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProgress(3, 4);
console.log(appleOrangeJuice);

const num = Number(23);
*/

/*
const hoistingAge1 = calcAge1(1994);

// Function declaration
function calcAge1(birthYear) {
  return 2037 - birthYear;
}

const age1 = calcAge1(1994);

// Function expresstion
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};

const age2 = calcAge2(1994);

console.log(age1, age2, hoistingAge1);
*/

/*
// Arrow function
const calcAge3 = (birthYear) => 2037 - birthYear;
const age3 = calcAge3(1994);
console.log(age3);

const yearsUtilRetirement = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  // return retirement;
  return `${firstName} retires in ${retirement} years`;
};

console.log(yearsUtilRetirement(1994, "Tuan"));
console.log(yearsUtilRetirement(1981, "Bob"));
*/

// Functions Calling Other Functions
function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcess(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);
  const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange`;
  return juice;
}

console.log(fruitProcess(3, 4));
