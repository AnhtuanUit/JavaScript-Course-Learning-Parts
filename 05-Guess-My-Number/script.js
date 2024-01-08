'use strict';

const secretNumber = Math.floor(Math.random() * 20) + 1;
let score = 20;
document.querySelector('.number').textContent = secretNumber;

document.querySelector('.check').addEventListener('click', function (e) {
  e.preventDefault();
  const guess = Number(document.querySelector('.guess').value);

  // When there is no input
  if (!guess) {
    document.querySelector('.message').textContent = '⛔️ No number!';

    // When player wins
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🥳 Correct number!';
    document.body.style = 'background-color: #60b346';
    document.querySelector('.number').style.width = '30rem';

    // When guess is too low
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📉 Too Low!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '💥 You lose the game!';
      document.querySelector('.score').textContent = 0;
    }

    // When guess is too high
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📉 Too High!';
      score--;
      document.querySelector('.score').textContent = score;

      // When guess is too low
    } else {
      document.querySelector('.message').textContent = '💥 You lose the game!';
      document.querySelector('.score').textContent = 0;
    }
  }
});
