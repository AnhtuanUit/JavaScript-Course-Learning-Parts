const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

// spendingLimits.jay = 200;
// const limit = spendingLimits[user] ? spendingLimits[user] : 0;

const getLimit = (limits, user) => limits?.[user] ?? 0;

// Pure function 🥳
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
console.log(newBudget1);
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
console.log(newBudget1);

// const check = function () {
//   for (const el of budget) {
//     let lim;
//     lim = spendingLimits?.[el.user] ?? 0;

//     if (el.value < -lim) {
//       el.flag = 'limit';
//     }
//   }
// };
// check();

const checkExpenses = (state, limits) => {
  return state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry
  );
};

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

//
const logBigExpenses = function (state, bigLimit) {
  const output = state
    .filter(entry => entry.value <= -bigLimit)
    .map(bigExpense => bigExpense.description.slice(-2))
    .join(' / ');
  // .reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, '')
  // .slice(2);
  return output;
};

// const logBigExpenses = function (limit) {
//   let output = '';
//   for (const el of budget) {
//     output += el.value <= -limit ? `${el.description.slice(-2)} / ` : '';
//   }
//   output = output.slice(0, -2); // Remove last '/ '
//   console.log(output);
// };

console.log(logBigExpenses(finalBudget, 100));
