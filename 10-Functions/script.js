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

/* const lufthasa = {
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
addVAT2(23); */

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
/* 
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const number = prompt(
      `What is your favourite programming language?\n${this.options.join('\n')}`
    );
    if (isNaN(number) || Number(number) > 3)
      alert(`answer ${number} wouldn't make sense, right?`);
    else {
      this.answers[Number(number)] += 1;
    }
    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [5, 2, 3] });
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }); */

////////////////////////////////////////////////
// Immediately Invoked Function Expressions (IIFE)
/* const runOnce = function () {
  console.log('This will never run again');
};

runOnce();

// IIFE
(function () {
  console.log('This will never run again');
  const isPrivate = 23;
})();

// console.log(isPrivate);
(() => console.log('This will ALSO never run again'))();

{
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate);
console.log(notPrivate);
 */
////////////////////////////////////////////////
// Closures
const securityBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = securityBooking();
booker();
booker();
booker();
console.dir(booker);
