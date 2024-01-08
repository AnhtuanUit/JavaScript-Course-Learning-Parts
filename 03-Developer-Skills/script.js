// Remember, we're gonna use strict mode in all scripts now!
'use strict';

/*
///////////////////////////////////////
// Using Google, StackOverflow and MDN

// PROBLEM 1:
// We work for a company building a smart home thermometer. Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."

What is temeperature amplitude. How we calculate it

What the error look like?

*/

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// 1) Understand the problem
// - What is temperature amplitude? Answer:diffrent between highest and lowest temp
// - How to compute max and min temp?
// - What is error sensor? And what to do?
// 2) Breaking up into sub-problems
// - How to ignore errors?
// - Find max value in array
// - Find min value in array
// - Subtract min from max(amplitude) then return it
/*
const calcTempAmplitude = temps => {
  let min = temps[0];
  let max = temps[0];
  for (let i = 0; i < temps.length; i++) {
    const temp = temps[i];
    if (temp === 'error') continue;
    if (min > temp) min = temp;
    if (max < temp) max = temp;
  }
  console.log(min, max);
  return max - min;
};

console.log(calcTempAmplitude(temperatures));

// PROBLEM 2:
// Function should now receive 2 arrays of temps

// 1) Understand the problem
// - What will we do with 2 arrays, should we calculate amplictude twice? NO. Just merge 2 arrays
// 2) Breaking up into sub-problems
// - How to merge 2 arrays?

const calcTempAmplitudeNew = (t1, t2) => {
  const temps = t1.concat(t2);
  let min = temps[0];
  let max = temps[0];
  for (let i = 0; i < temps.length; i++) {
    const temp = temps[i];
    if (temp === 'error') continue;
    if (min > temp) min = temp;
    if (max < temp) max = temp;
  }
  console.log(min, max);
  return max - min;
};

console.log(calcTempAmplitudeNew(temperatures, [2, 3, 100]));
*/
/*
// Debugging with the Console and Breakpoints
const mesureKevil = () => {
  const mesurement = {
    type: 'temp',
    unit: 'celcius',
    value: 10,
    // C) FIX
    // value: Number(prompt('Degrees celcius:')),
    // value: prompt('Degrees celcius:'),
  };
  // B) FIND
  console.log(mesurement.value);
  const kelvin = mesurement.value + 273;
  return kelvin;
};

// A) IDENTIFY
console.log(mesureKevil());

// debugger
const calcTempAmplitudeBug = (t1, t2) => {
  const temps = t1.concat(t2);
  let min = temps[0];
  let max = temps[0];
  for (let i = 0; i < temps.length; i++) {
    const temp = temps[i];
    if (temp === 'error') continue;
    if (min > temp) min = temp;
    if (max < temp) max = temp;
  }
  console.log(min, max);
  return max - min;
};
console.log(calcTempAmplitudeBug(temperatures, [2, 3, 100]));
*/
///////////////////////////////////////
// Coding Challenge #1

/*
Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.

Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

Use the problem-solving framework: Understand the problem and break it up into sub-problems!

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]
*/

/*
// 1) Understanding the problem
- Array transformed to string, separated by ... 
- What does each number represent for each day, and how can we determine the temperature for each day? X days -> index + 1
// 2) Breaking up into sub-problems
- Transform array into string
- Transform each element to string with ºC
- String need to contains day(index + 1)
*/

const printForecast = arr => {
  let string = '...';
  for (let i = 0; i < arr.length; i++) {
    string = string.concat(` ${arr[i]}ºC in ${i + 1} days ...`);
  }
  return string;
};
// TEST DATA 1: [17, 21, 23]
// TEST DATA 2: [12, 5, -5, 0, 4]
console.log(printForecast([17, 21, 23]));
console.log(printForecast([12, 5, -5, 0, 4]));
