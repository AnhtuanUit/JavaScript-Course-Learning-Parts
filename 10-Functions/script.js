'use strict';
////////////////////////////////////////////////
// Default Parameters

const bookings = [];

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
createBooking('LH123', undefined, 1000);
