'use strict';

/*
// Function to print age based on birth year and first name
function printAge(birthYear) {
  const age = 2037 - birthYear;
  // Output message includes age, birth year, and firstName
  let output = `You are ${age}, born in ${birthYear}`;
  console.log(output);
  if (birthYear >= 1981 && birthYear <= 1996) {
    var millennial = true;
    // Create new variable with the same name as outer scope's variable
    const firstName = 'Steven';
    // Reasigning outer scope's variable
    output = 'NEW OUTPUT';
    const str = `Oh, and you're a millennial, ${firstName}`;
    console.log(str);

    function add(a, b) {
      return a + b;
    }
  }

  // console.log(str);
  console.log(millennial);
  // console.log(add(1, 2));
  // console.log(output);
}

// firstName is declared outside the function and accessible inside printAge
const firstName = 'Tuan';
// Calling printAge with a specific birth year
printAge(1994);
// Note: Inside printAge function, if firstName is declared after the function call, it won't be accessible.

// Testing the scope of the 'test' variable
const add = (a, b) => {
  // 'test' is declared with 'var' inside the function
  var test = true;
  return a + b;
};

// Attempting to log 'test' outside its scope
// console.log(test); // This will result in an error because 'test' is not accessible outside the add function.
*/
// Hosting and TDZ in Pratice

console.log(me);
// console.log(job);
// console.log(year);

var me = 'Tuan';
let job = 'leaner';
const year = 1994;

// Functions
console.log(addDecl(2, 3));
// console.log(addExpr(2, 3));
// console.log(addArrow(2, 3));

function addDecl(a, b) {
  return a + b;
}

var addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

// Illustrating a bug with 'var' hoisting in JavaScript
console.log(numProducts); // Outputs 'undefined' due to hoisting
if (!numProducts) deleteShoppingCart(); // Condition is true, leading to the unexpected execution of deleteShoppingCart
var numProducts = 10; // Variable declaration is hoisted, but the assignment happens here
function deleteShoppingCart() {
  console.log('All products deleted');
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);
