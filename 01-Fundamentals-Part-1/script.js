/*
let js = "amazing";
// if (js === "amazing") alert("JavaScript is FUN");
console.log(40 + 8 + 23 - 10);

// console.log("Jonas");
// console.log(23);

// 1) VALUES AND VARIABLES
let firstName = "Tuan";

console.log(firstName);
console.log(firstName);
console.log(firstName);
// Variable name convention
let do_anh_tuan = "DAT";
let $function = 27;

let person = "tuando";
let PI = 3.1415;

let myFirstJob = "Programer";
let mySecondJob = "Youtuber";

let job1 = "programer";
let job2 = "youtuber";

console.log(myFirstJob);

*/
/*
// Data Types
let javascriptIsFun = true;
console.log(javascriptIsFun);

// console.log(23);
// console.log("TuanDo");
console.log(typeof javascriptIsFun);

javascriptIsFun = "YES!";
console.log(typeof javascriptIsFun);

let year;
console.log(year);
console.log(typeof year);

year = 1994;
console.log(typeof year);

console.log(typeof null);
*/

/*
// let, const and var
let age = 29;
age = 30;

const birthYear = 1994;
// birthYear = 1995;
// const job;

var job = "programer";
job = "learner";

lastName = "Do Anh";
console.log(lastName);
*/

/*
// Math Operators
const now = 2037;
const ageTuan = now - 1994;
const ageSarah = now - 2018;
console.log(ageTuan, ageSarah);

console.log(ageTuan * 2, ageSarah / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2

const firstName = "Tuan";
const lastName = "Do";
console.log(firstName + " " + lastName);

// Assignment Operators
let x = 10 + 5; // 15
x += 10; // x = x + 10 = 25
x *= 4; // x = x * 4 = 100
x++; // x = x + 1 = 101;
x--; // x = x - 1 = 100;
x--; // x = x - 1 = 99;
console.log(x);

// Comparation Operators
console.log(ageTuan > ageSarah);
console.log(ageSarah >= 19);

console.log(now - 1994 > now - 2018);
*/
/*
// Operator Precedence
const now = 2037;
const ageTuan = now - 1994;
const ageSarah = now - 2018;

console.log(now - 1994 > now - 2018);

let x, y;
x = y = 25 - 5 - 10; // x = y = 10, x = 10
console.log(x, y);

const averageAge = (ageSarah + ageTuan) / 2;
console.log(ageTuan, ageSarah, averageAge);
*/

/*
// String and Template Literal
const firstName = "Tuan";
const job = "learner";
const birthYear = 1994;
const year = 2037;

const tuan =
  "I'm " + firstName + ", a " + (year - birthYear) + " years old " + job;

console.log(tuan);

console.log(`I'm ${firstName}, a ${year - birthYear} years old ${job}`);

console.log(
  "String with\n\
multiple \n\
lines"
);

console.log(`String with
multiple
lines`);
*/

/*
const age = 15;
if (age >= 18) {
  console.log("Sarah can start driving license 🚗");
} else {
  const yearsLeft = 18 - age;
  console.log(`Sarah is too young. Wait another ${yearsLeft} years :)`);
}

const birthYear = 1994;
let century;
if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);
*/
/*
// type conversion
const inputYear = "1994";
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

console.log(Number("Tuan"));
console.log(typeof NaN);

console.log(String(23), 23);

// type coercion
console.log("I'm " + 23 + " years old");
console.log("23" - "10" - 3);
console.log("23" / "2");

let n = "1" + 1; // "1" + "1" = "11"
n--; // 11 - 1 = 10
console.log(n); // 10
*/

// 5 falsy values: 0, '', undefined, null, NaN
console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean(undefined));
console.log(Boolean(null));
console.log(Boolean(NaN));

const money = 0;
if (money) {
  console.log("Don't spent it all ;");
} else {
  console.log("You should get a job!");
}

let height = 0;
if (height) {
  console.log("YAY! height is defined");
} else {
  console.log("height is UNDEFINEND");
}
