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
const greet = function (greeting) {
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
