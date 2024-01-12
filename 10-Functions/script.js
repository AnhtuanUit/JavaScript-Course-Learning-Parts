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
const flight = 'LH234';
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
