"use strict";
/*
// Functions
function logger() {
  console.log("My name is Tuan");
}

// calling / running / invoking function
logger();
logger();
logger();

function fruitProgress(apples, oranges) {
  const fruit = `Juice with ${apples} apples and ${oranges} oranges.`;
  return fruit;
}

const appleJuice = fruitProgress(3, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProgress(3, 4);
console.log(appleOrangeJuice);

const num = Number(23);
*/
////////////////////////////////////////////////////////////////
// Function declaration + Function expresstion
/*
const hoistingAge1 = calcAge1(1994);

// Function declaration
function calcAge1(birthYear) {
  return 2037 - birthYear;
}

const age1 = calcAge1(1994);

// Function expresstion
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};

const age2 = calcAge2(1994);

console.log(age1, age2, hoistingAge1);
*/
////////////////////////////////////////////////////////////////
/*
// Arrow function
const calcAge3 = (birthYear) => 2037 - birthYear;
const age3 = calcAge3(1994);
console.log(age3);

const yearsUtilRetirement = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  // return retirement;
  return `${firstName} retires in ${retirement} years`;
};

console.log(yearsUtilRetirement(1994, "Tuan"));
console.log(yearsUtilRetirement(1981, "Bob"));
*/
////////////////////////////////////////////////////////////////
/*
// Functions Calling Other Functions
function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcess(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);
  const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange`;
  return juice;
}

console.log(fruitProcess(3, 4));
*/
////////////////////////////////////////////////////////////////

/*
// Reviewing Functions
function calcAge(birthYear) {
  return 2037 - birthYear;
}

const yearsUtilRetirement = function (birthYear, firstName) {
  const age = calcAge(birthYear);
  const retirement = 65 - age;
  // return retirement;

  if (retirement > 0) {
    console.log(`${firstName} retires in ${retirement} years`);
    return retirement;
  } else {
    console.log(`${firstName} already retired 👏`);
    return -1;
  }
};

console.log(yearsUtilRetirement(1994, "Tuan"));
console.log(yearsUtilRetirement(1971, "Bob"));
*/
////////////////////////////////////////////////////////////////
/*
CHALLENGE #1
Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.

Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).

A team only wins if it has at least double the average score of the other team. Otherwise, no team wins!



Your tasks:

Create an arrow function calcAverage to calculate the average of 3 scores. This function should have three parameters and return a single number (the average score).

Create two new variables — scoreDolphins and scoreKoalas, and assign the value returned from the calcAverage function to them (you will need to call this function, and pass scores as arguments).

Create a function checkWinner that takes the average score of each team as parameters (avgDolphins and avgKoalas), and then logs the winner to the console, together with the victory points, according to the rule above. Example: Koalas win (30 vs. 13) (use avgDolphins and avgKoalas instead of hard-coded values).

Use the checkWinner function to determine the winner for both DATA 1 and DATA 2.

Ignore draws this time. Instead, log No team wins... to the console if there is no winner.



TEST DATA 1: Dolphins scored 44, 23, and 71. Koalas scored 65, 54, and 49.

TEST DATA 2: Dolphins scored 85, 54, and 41. Koalas scored 23, 34, and 27.



👋 OPTIONAL: You can watch my solution in video format in the next lecture
*/

/* Write your code below. Good luck! 🙂 */
/*
// TEST 1
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

let scoreDolphins = calcAverage(44, 23, 71);
let scoreKoalas = calcAverage(65, 54, 49);
console.log(scoreDolphins, scoreKoalas);
const checkWinner = function (avgDolphins, avgKoalas) {
  if (avgDolphins >= 2 * avgKoalas) {
    console.log(`Dolphins win 🏆 (${avgDolphins} vs. ${avgKoalas})`);
  } else if (avgKoalas >= 2 * avgDolphins) {
    console.log(`Koalas win 🏆 (${avgKoalas} vs. ${avgDolphins})`);
  } else {
    console.log("No team wins...");
  }
};

checkWinner(scoreDolphins, scoreKoalas);

// TEST 2
scoreDolphins = calcAverage(85, 54, 41);
scoreKoalas = calcAverage(23, 34, 27);
console.log(scoreDolphins, scoreKoalas);
checkWinner(scoreDolphins, scoreKoalas);
*/
/*
// Introductions to Arrays
const friend1 = "Giang";
const friend2 = "Loc";
const friend3 = "Huy";

const friends = ["Loc", "Phuoc", "Tung"];
console.log(friends);
const years = new Array(1994, 1993, 1995, 2000);
console.log(friends[0]);
console.log(friends[1]);
console.log(friends.length);

console.log(friends[friends.length - 1]);

friends[2] = "Me";
console.log(friends);
const firstName = "Tuan";

const tuan = [firstName, "Do", 2037 - 1994, "leaner", friends];
console.log(tuan);
console.log(tuan.length);

// Exericise
const calcAge = function (birthYear) {
  return 2037 - birthYear;
};

const years2 = [1991, 1994, 2000, 2005];

const age1 = calcAge(years2[0]);
const age2 = calcAge(years2[1]);
const age3 = calcAge(years2[2]);
console.log(age1, age2, age3);

const ages = [
  calcAge(years2[0]),
  calcAge(years2[1]),
  calcAge(years2[years2.length - 1]),
];
*/
/*
// 40. Basic Array Operations(Methods)
const friends = ["Phuoc", "Loc", "Tung"];

// Add elements
const newLength = friends.push("Duong"); // Add last
console.log(friends);
console.log(newLength);

friends.unshift("John"); // Add first
console.log(friends);

// Remove elements
friends.pop(); // Last
const poped = friends.pop();
console.log(poped);

friends.shift(); // First
console.log(friends);

console.log(friends.indexOf("Phuoc"));
console.log(friends.indexOf("Me"));

friends.push(23);
console.log(friends.includes(23));
console.log(friends.includes("Phuoc"));
console.log(friends.includes("Bob"));

if (friends.includes("Phuoc")) {
  console.log("You have a friend called Phuoc");
}

*/

/*

CHALLENGE #2
Steven wants you to improve his tip calculator, using the same rules as before — tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.

Your tasks:

Write a function calcTip that takes any bill value as an input and returns the corresponding tip, calculated based on the rules above (you can check out the code from the first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100.

And now let's use arrays! So, create an array called bills containing the test data below.

Create an array called tips containing the tip value for each bill, calculated from the function you created before.

BONUS: Create an array totals containing the total values, so the bill + tip.

TEST DATA: 125, 555, and 44.

*/
/* Write your code below. Good luck! 🙂 */
/*
const calcTip = (bill) =>
  50 <= bill && bill <= 300 ? bill * 0.15 : bill * 0.2;

console.log(calcTip(100));

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const totals = [tips[0] + bills[0], tips[1] + bills[1], tips[2] + bills[2]];
console.log(tips, totals);
*/

// Introduction to Objects
const tuanArray = [
  "Tuan",
  "Do",
  2037 - 1994,
  "learner",
  ["Loc", "Phuoc", "Tung", "Duong"],
];

const tuan = {
  firstName: "Tuan",
  lastName: "Do",
  age: 2037 - 1994,
  job: "learner",
  friends: ["Loc", "Phuoc", "Tung", "Duong"],
};
console.log(tuan);
console.log(tuan.firstName);
console.log(tuan["lastName"]);

const nameKey = "Name";
console.log(tuan["first" + nameKey]);
console.log(tuan["last" + nameKey]);

const interestedIn = prompt(
  "What do you want to know about Tuan? Chose between job, firstName, friends, age, and friends"
);

console.log(interestedIn);

if (tuan[interestedIn]) {
  console.log(tuan[interestedIn]);
} else {
  console.log(
    "Wrong request! Chose between job, firstName, friends, age, and friends"
  );
}

tuan.location = "Ho Chi Minh, Vietnam";
tuan["linkedin"] = "https://www.linkedin.com/in/at7194/";
console.log(tuan);

// Challenge
// "Tuan has 3 friends and his best friend called Loc"

console.log(
  `${tuan.firstName} has ${tuan.friends.length} friends and his best friend called ${tuan.friends[0]}`
);
