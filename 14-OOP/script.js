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

////////////////////////////////////////////////
// Coding Challenge #1
/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
// 1.
const CarCl = function (make, speed) {
  this.speed = speed;
  this.make = make;
};

// 2.
CarCl.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

// 3.
CarCl.prototype.brake = function () {
  this.speed = this.speed > 5 ? this.speed - 5 : 0;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

// 4.
// km/h
const bmw = new CarCl('BMW', 40);
const mercedes = new CarCl('Mercedes', 100);
bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.brake();

mercedes.accelerate();
mercedes.accelerate();
mercedes.brake();
mercedes.brake();
