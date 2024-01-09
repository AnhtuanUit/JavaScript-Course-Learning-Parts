'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

function getWinningScore() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('winningScore')
    ? Number(urlParams.get('winningScore'))
    : 100;
}

const winningScore = getWinningScore();
let currentScore = 0;
let scores = [0, 0];
let activePlayer = 0;
let playing = true;

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

function handleTotalScore() {
  // Add current score to total score
  scores[activePlayer] += currentScore;
  // Display total score
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate random dice roll
    const dice = Math.floor(Math.random() * 6) + 1;
    // 2. Display dice roll
    if (diceEl.classList.contains('hidden')) diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Check if dice roll = 1
    if (dice !== 1) {
      // Add dice roll to current score
      currentScore += dice;

      // Display new score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // Check if score >= 100 -> Diplay current user win
      const nextMaybeTotalScore = currentScore + scores[activePlayer];
      if (nextMaybeTotalScore >= winningScore) {
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');
        playing = false;

        handleTotalScore();
      }
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    handleTotalScore();

    // Switch to next player
    switchPlayer();
  }
});

btnNewGame.addEventListener('click', function () {
  // 1. Update currentScore = 0
  // 2. Update scores = [0, 0]
  // 3. Update playing = true
  // 4. Update activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;

  // 5. Display currentScore of current player = 0
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  // 6. Display total score of each player = 0
  score0El.textContent = 0;
  score1El.textContent = 0;
  // 7. Revove class player-winner from activePlayer
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  // 8. Update player--active to player--0, remove from player--1
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
});
