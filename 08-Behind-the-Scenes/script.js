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
/*
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
*/

/*
// The this Keyword in pratice
console.log(this);

// function calcAge(birthYear) {
//   console.log(2037 - birthYear);
//   console.log(this);
// }

// Regular function call without being attached to any specific object or context

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this);
};
calcAge(1994);

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this);
};
calcAgeArrow(1994);

const tuan = {
  birthYear: 1994,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.birthYear);
    return 2037 - this.birthYear;
  },
};

tuan.calcAge();

const matilda = {
  birthYear: 2017,
};

matilda.calcAge = tuan.calcAge;
matilda.calcAge();
const f = tuan.calcAge;
// f();
*/

/*
// Regular Functions vs. Arrow Functions
const tuan = {
  firstName: 'Tuan',
  birthYear: 1994,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.birthYear);
    // Solution 1
    // const seft = this;
    // const isMillenial = function () {
    //   console.log(this);
    //   console.log(seft);
    //   console.log(seft.birthYear >= 1981 && seft.birthYear <= 1996);
    // };

    // Solution 1
    const isMillenial = () => {
      console.log(this);
      console.log(this.birthYear >= 1981 && this.birthYear <= 1996);
    };
    isMillenial();
    return 2037 - this.birthYear;
  },
  greet: () => {
    console.log(this);
    console.log(`Hey, my name is ${this.firstName}`);
  },
};

tuan.greet();
tuan.calcAge();

function addDecl(a, b) {
  console.log(arguments);
  return a + b;
}

var addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};

var addArrow = (a, b) => {
  // console.log(arguments);
  return a + b;
};
addDecl(1, 2, 3);
addExpr(1, 2, 3);
addArrow(1, 2, 3);
*/

/*
// Primitives vs. Objects(Primitives vs. Reference Types)
let age = 30;
let oldAge = age;
age = 31;
console.log(age, oldAge);

const me = {
  firstName: 'Tuan',
  age: 30,
};

const friend = me;
friend.age = 27;

console.log('Friend', friend);
console.log('Me', me);
*/

// Primitives vs. Objects in Pratice
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(oldLastName, lastName);

const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before marriage:', jessica);
console.log('After marriage:', marriedJessica);

// Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

// Caution: The use of Object.assign performs a shallow copy, not a deep copy of the object.
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('Before marriage:', jessica2);
console.log('After marriage:', jessicaCopy);
