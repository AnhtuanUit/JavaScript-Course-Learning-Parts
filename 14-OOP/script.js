'use strict';
////////////////////////////////////////////////
// Constructor Functions and the new Operator
const Person = function (firstName, birthYear) {
  // Instant properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this!
  // this.calcAge = function () {
  //   console.log(11);
  //   console.log(2037 - this.birthYear);
  // };
};

const tuan = new Person('Tuan', 1994);

console.log(tuan);

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);

console.log(tuan instanceof Person);

Person.hey = function () {
  console.log('Hey there 👋');
  console.log(this);
};
Person.hey();
////////////////////////////////////////////////
// Prototypes
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

tuan.calcAge();
matilda.calcAge();

console.log(tuan.__proto__);
console.log(tuan.__proto__ === Person.prototype);

// prototypeOfLinkedObjects
Person.prototype.species = 'Homo Sapiens';
console.log(tuan.species, matilda.species);

console.log(tuan.hasOwnProperty('firstName'));
console.log(tuan.hasOwnProperty('species'));

////////////////////////////////////////////////
// Prototypal Ingeritance on Built-in Objects
console.log(tuan.__proto__);
// Object.prototype (top of prototype chain)
// console.log(Object.prototype);

console.log(tuan.__proto__.__proto__);
console.log(tuan.__proto__.__proto__ === Object.prototype); // true
console.log(tuan.__proto__.__proto__.__proto__); // null

console.log(Person.prototype.constructor);

const arr = [3, 6, 6, 5, 6, 9, 9]; //new Array = []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__ === Object.prototype); // Object.prototype (top of prototype chain)

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1);
console.dir(x => x + 1);
