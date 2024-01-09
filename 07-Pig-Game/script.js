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
const currentScore0El = document.getElementById(`current--0`);
const currentScore1El = document.getElementById(`current--1`);

let currentScore, scores, activePlayer, playing;

function init() {
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;

  // 1. Hide dice
  diceEl.classList.add('hidden');

  // 2. Reset currentScore of each player
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  // 3. Reset total score of each player
  score0El.textContent = 0;
  score1El.textContent = 0;

  // 4. Revove class player-winner from each player
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // 5. Update player--active into player1, remove from player2
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}

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

function getWinningScore() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('winningScore')
    ? Number(urlParams.get('winningScore'))
    : 100;
}

init();

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
      if (nextMaybeTotalScore >= getWinningScore()) {
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

btnNewGame.addEventListener('click', init);
