'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    let movDate = new Date();
    const year = movDate.getFullYear();
    const month = (movDate.getMonth() + 1).toString().padStart(2, 0);
    const day = movDate.getDay().toString().padStart(2, 0);
    movDate = `${day}/${month}/${year}`;

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    
      <div class="movements__date">${movDate}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    let loginDate = new Date();
    const year = loginDate.getFullYear();
    const month = `${loginDate.getMonth() + 1}`.padStart(2, 0);
    const day = `${loginDate.getDay()}`.padStart(2, 0);
    const hours = `${loginDate.getHours()}`.padStart(2, 0);
    const minutes = `${loginDate.getMinutes()}`.padStart(2, 0);
    loginDate = `${day}/${month}/${year}, ${hours}:${minutes}`;

    labelDate.textContent = loginDate;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// Converting and Checking Numbers
/* console.log(23 === 23.0);

// Base 10 - 0  to 9. 1/10 = 0.1. 3/10 = 3.333333333
console.log('---JAVASCRIPT_BASE_BINARY---');
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

// Conversion

console.log('---CONVERSION---');
console.log(Number('23'));
console.log(+'23');

// Parsing
console.log('---PARSING---');
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('e23'), 10);

console.log(Number.parseInt('    2.5rem    '));
console.log(Number.parseFloat('    2.5rem   '));

// console.log(parseFloat('    2.5rem   '));

// Check if value is NaN
console.log('---CHEKC_VALUE_NaN---');
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20X')); // true
console.log(Number.isNaN(23 / 0)); // false

// Check if value is number
console.log('---CHECK_VALUE_NUMBER---');
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20X')); // false
console.log(Number.isFinite(23 / 0)); // false

console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger(23 / 0)); // false
 */
////////////////////////////////////////////////
// Math and Rounding
/* console.log('---MATH_AND_ROUNDING---');
console.log(Math.sqrt(25)); // 5
console.log(25 ** (1 / 2)); // 5
console.log(8 ** (1 / 3)); // 2

console.log(Math.max(5, 18, 23, 11, 2)); // 23
console.log(Math.max(5, 18, '23', 11, 2)); // 23
console.log(Math.max(5, 18, '23px', 11, 2)); // NaN

console.log(Math.min(5, 18, 23, 11, 2)); // 2
console.log(Math.PI * Number.parseFloat('10px') ** 2); //

console.log(Math.trunc(Math.random() * 6) + 1); // Random from 1 to 6

const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
// 0....1 -> 0....(max - min)  -> min ... maz
console.log(randomInt(10, 20)); // Random from 10 to 20

// Rounding intergers
console.log('---ROUNDING_INTERGERS---');
console.log(Math.round(23.3)); // 23
console.log(Math.round(23.9)); // 24

console.log(Math.ceil(23.3)); // 24
console.log(Math.ceil(23.9)); // 24

console.log(Math.floor(23.3)); // 23
console.log(Math.floor(23.9)); // 23

console.log(Math.trunc(23.3)); // 23
console.log(Math.trunc(23.9)); // 23

console.log('---NEGATIVE_INTERGERS---');
console.log(Math.trunc(-23.3)); // -23
console.log(Math.trunc(-23.9)); // -23

console.log(Math.floor(-23.3)); // -24
console.log(Math.floor(-23.9)); // -24

// Rounding decimals
console.log((2.7).toFixed(0)); // '3'
console.log((2.7).toFixed(3)); // '2.700'
console.log((2.345).toFixed(2)); //  '2.35'
console.log(+(2.345).toFixed(2)); // 2.35
 */
////////////////////////////////////////////////
// The remainder operator - '%'
/* console.log(5 % 2); // 1
console.log(5 / 2); // 5 = 2 * 2 + 1

console.log(8 % 3); // 2
console.log(8 / 3); // 8 = 2 * 3 + 2

console.log(6 % 2); // 0
console.log(6 / 2); // 6 = 3 * 2 + 0

console.log(7 % 2); // 1
console.log(7 / 2); // 7 = 3 * 2 + 1

const isEven = n => n % 2 === 0;

console.log(isEven(0)); // true
console.log(isEven(23)); // false
console.log(isEven(23)); // false
console.log(isEven(514)); // true

labelBalance.addEventListener('click', () => {
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    // 0, 2, 4, 6
    if (i % 2 === 0) row.style.backgroundColor = 'red';
    // 0, 3, 6, 9
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});
 */

////////////////////////////////////////////////
// Numberic Separators

// 287,460,000,000
/* const diameter = 287_460_000_000;
console.log(diameter); // 287460000000

const price = 345_99;
console.log(price); // 34599

const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.141_5;
console.log(PI); // 3.1315

console.log(Number('230_000')); // NaN
console.log(Number.parseInt('230_000')); // 230
 */

////////////////////////////////////////////////
// Working with BigInt
/* console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

console.log(4349837489237498327489274794827482n);
console.log(BigInt(43434343));

// Operations
console.log(1000n + 1000n); // 2000n
console.log(3754586357863578634586347n * 4374637463n);
// console.log(Math.sqrt(16n)); // Error: Cannot convert a BigInt value to a number

console.log('---HUGE_PART---');
const huge = 4587498573985473958n;
const num = 23;
console.log(huge * BigInt(num)); // ....n

// Exceptions
console.log(20n > 15); // true
console.log(20n === 20); // false
console.log(typeof 20n); // bigint
console.log(20n == 20); // true

console.log(huge + 'is REALLYbig!!!'); // '4587498573985473958is REALLYbig!!!'

// Divisions
console.log(11n / 3n); // 3n
console.log(10 / 3); // 3.333333
 */
////////////////////////////////////////////////
// Creating Dates

// Create a date
/* console.log('---CREATE_A_DATE---');
const now = new Date();
console.log(now); // Sun Jan 14 2024 11:58:03 GMT+0700 (Indochina Time)

console.log(new Date('Aug 02 2020 18:05:41')); // Sun Aug 02 2020 18:05:41 GMT+0700 (Indochina Time)
console.log(new Date('December 24,2015')); // Thu Dec 24 2015 00:00:00 GMT+0700 (Indochina Time)

console.log(new Date(2037, 10, 19, 15, 23, 5)); // XXX Nov 19 2037 15:23:05 GMT+0700 (Indochina Time)
console.log(new Date(2037, 10, 31)); // XXX Dec 01 2037 00:00:00 GMT+0700 (Indochina Time)

console.log(new Date(0)); // Thu Jan 01 1970 08:00:00 GMT+0800 (Indochina Time)
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Sun Jan 04 1970 08:00:00 GMT+0800

// Working with dates
console.log('---WORKING_WITH_DATES---');
const furture = new Date(2037, 10, 19, 15, 23); // XXX Nov 19 2037 15:23:00 GMT+0700
console.log(furture); // XXX Nov 19 2037 15:23:00 GMT+0700
console.log(furture.getFullYear()); // 2037
console.log(furture.getMonth()); // 10
console.log(furture.getDate()); // 19
console.log(furture.getDay()); // XXX 4
console.log(furture.getHours()); // 15
console.log(furture.getMinutes()); // 23
console.log(furture.getSeconds()); // 0
console.log(furture.toISOString()); // "2037-11-19T08:23:00.000Z"
console.log(furture.getTime()); // 2142231780000

console.log(new Date(2142256980000)); // Thu Nov 19 2037 22:23:00 GMT+0700 (Indochina Time)
console.log(Date.now()); // Mon Nov 19 2040 15:23:00 GMT+0700 (Indochina Time)

furture.setFullYear(2040);
console.log(furture); // XXX Nov 19 2040 15:23:00 GMT+0700
 */