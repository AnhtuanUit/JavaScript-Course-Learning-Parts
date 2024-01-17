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

////////////////////////////////////////////////
// ES6 Classes
console.log('---ES6_CLASSES---');
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  //  Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }
  get fullName() {
    return this._fullName;
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();

console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.fullName}`);
// };

jessica.greet();

// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens
// 3. Classes are executed in strict mode

////////////////////////////////////////////////
// Setters and Getters
console.log('---SETTERS_GETTERS---');
const account = {
  owner: 'Tuan',
  movements: [200, 530, 120, 300],
  get lastest() {
    return this.movements.slice(-1).pop();
  },
  set lastest(mov) {
    this.movements.push(mov);
  },
};
console.log(account.lastest);

account.lastest = 50;
console.log(account.movements);

// Setter and Getters in Class: PersonCl
const walter = new PersonCl('Walter White', 1965);
console.log(walter.age);

////////////////////////////////////////////////
// Object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.firstName = 'Steven';
steven.birthYear = 2000;
console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 2007);
sarah.calcAge();

////////////////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

// const CarES6 =  function (make, speed) {
//   this.speed = speed;
//   this.make = make;
// };

// 1.
class CarES6 {
  constructor(make, speed) {
    this.speed = speed;
    this.make = make;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed = this.speed > 5 ? this.speed - 5 : 0;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  // 2.
  get speedUS() {
    // mi/h (divide by 1.6);
    return this.speed / 1.6;
  }

  // 3.
  set speedUS(speedMi) {
    this.speed = speedMi * 1.6;
  }
}
// km/h
// DATA CAR 1: 'Ford' going at 120 km/h
const ford = new CarES6('Ford', 120);

console.log(ford.speedUS);

ford.accelerate();
ford.brake();
ford.speedUS = 100;
console.log(ford);
