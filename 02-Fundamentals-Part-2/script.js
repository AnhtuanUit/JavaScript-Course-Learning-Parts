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
