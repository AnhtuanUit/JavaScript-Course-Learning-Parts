'use strict';
////////////////////////////////////////////////
// Default Parameters

/* const bookings = [];

const createBooking = function (
  flightNumber,
  numPassengers = 1,
  price = numPassengers * 199
) {
  // ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199 * numPassengers;

  const booking = {
    flightNumber,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);
createBooking('LH123', undefined, 1000); */
////////////////////////////////////////////////
// How Passing Arguments Works: Values vs. Reference
// 1) Primitives Values
/* const flight = 'LH234';
// 2) Object(Reference Values)
const tuan = {
  name: 'Tuan Do',
  passport: 253677818,
};

const checkIn = function (flightNumber, passenger) {
  flightNumber = 'LH999';
  passenger.name = 'Mr.' + passenger.name;

  if (passenger.passport === 253677818) {
    console.log('Checked in');
  } else {
    console.log('Wrong passport');
  }
};

checkIn(flight, tuan);
console.log(flight);
console.log(tuan);

// Is the same as doing...
// const flighNum = flight;
// const passenger = tuan;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000);
};

newPassport(tuan);
checkIn(flight, tuan);
 */
////////////////////////////////////////////////\
// Function Accepting Callback Functions
// Create oneWord function
/* const oneWord = str => {
  return str.replace(/ /g, '').toLowerCase();
};
// Create upperFirstWord function
const upperFirstWord = str => {
  const [first, ...orthers] = str.split(' ');
  return [first.toUpperCase(), ...orthers].join(' ');
};
// Create higher-order function
const transformer = (str, fn) => {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};
transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);
// Create high5 function - JS uses callbacks all the time
const high5 = () => console.log('👋');

// Add event listener 'click' for high5 call back function
document.body.addEventListener('click', high5);

// High5 5 times with arrays ['Jonas', 'Martha', 'Adam']
['Jonas', 'Martha', 'Adam'].forEach(high5);
 */
////////////////////////////////////////////////
// Functions Returning Functions
/* const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greetHey = greet('Hey');
greetHey('Tuan');
greetHey('Steven');

greet('Hello')('Tuan');

// Challenge
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('Arrow - Hello')('Tuan');
 */
////////////////////////////////////////////////
// The call and apply Methods

const lufthasa = {
  ariline: 'Lufthasa',
  iataCode: 'LH',
  bookings: [],
  // book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.ariline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthasa.book(134, 'Tuan Do');
lufthasa.book(134, 'John Smith');
// console.log(lufthasa.bookings);

const eurowings = {
  ariline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthasa.book;

// Does NOT work
// book(23, 'Sarah Williams');

// Call method
book.call(eurowings, 23, 'Sarah Williams');
// console.log(eurowings);

book.call(lufthasa, 239, 'Mary Cooper');
// console.log(lufthasa);

const swiss = {
  ariline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 443, 'Mary Cooper');
// console.log(swiss);

// Apply method
const flightData = [33, 'Mary Cooper'];
book.apply(swiss, flightData);
// console.log(swiss);

book.call(swiss, ...flightData);

////////////////////////////////////////////////
// The bind Method
console.clear();
book.call(eurowings, 23, 'Sarah Williams');

const bookEW = book.bind(eurowings);
const bookLX = book.bind(swiss);
const bookLH = book.bind(lufthasa);

bookEW(43, 'Sarah');
bookLX(45, 'Steave');
bookLH(48, 'Tom');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Sarah');
bookEW23('Tuan');

// With Event Listeners
lufthasa.planes = 300;
lufthasa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// lufthasa.buyPlane();

// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthasa.buyPlane.bind(lufthasa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.1);
// addVAT = value => value + value * 0.23

console.log(addVAT(200));
console.log(addVAT(100));
console.log(addVAT(23));

const addTaxRate = rate => value => value + value * rate;

console.log(addTaxRate(0.1)(100));
console.log(addTaxRate(0.1)(23));

const addVAT2 = addTaxRate(0.1);
addVAT2(100);
addVAT2(23);
