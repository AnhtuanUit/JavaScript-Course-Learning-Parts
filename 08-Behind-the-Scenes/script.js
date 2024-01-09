'use strict';

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
