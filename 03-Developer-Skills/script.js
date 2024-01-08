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
