'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const curScore0El = document.getElementById('current--0');
const curScore1El = document.getElementById('current--1');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore0 = 0;
let totalScore0 = 0;

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // 1. Generate random dice roll
  const dice = Math.floor(Math.random() * 6) + 1;
  // 2. Display dice roll
  if (diceEl.classList.contains('hidden')) diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  // 3. Check if dice roll = 1
  if (dice === 1) {
    // 3.1 Switch to next player
    curScore0El.textContent = 0;
  } else {
    // 3.2 Add dice roll to current score
    currentScore0 += dice;

    // 4. Display new score
    curScore0El.textContent = currentScore0;

    // 5. Check if score >= 100 -> Diplay current user win
    if (totalScore0 + currentScore0 > 100) {
      alert('Player 1 win');
    }
  }
});
