'use strict';

let secretNumber = Math.floor(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

document.querySelector('.check').addEventListener('click', function (e) {
  e.preventDefault();
  const guess = Number(document.querySelector('.guess').value);

  // When there is no input
  if (!guess) {
    displayMessage('⛔️ No Number!');
    // When player wins
  } else if (guess === secretNumber) {
    displayMessage('🥳 Correct number!');
    document.querySelector('.number').textContent = secretNumber;
    document.body.style = 'background-color: #60b346';
    document.querySelector('.number').style.width = '30rem';

    if (highScore < score) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else {
    if (score > 1) {
      displayMessage(guess < secretNumber ? '📉 Too Low!' : '📉 Too High!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '💥 You lose the game!';
      document.querySelector('.score').textContent = 0;
    }
  }
  // When guess is too low
  // } else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📉 Too Low!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = '💥 You lose the game!';
  //     document.querySelector('.score').textContent = 0;
  //   }

  //   // When guess is too high
  // } else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📉 Too High!';
  //     score--;
  //     document.querySelector('.score').textContent = score;

  //     // When guess is too low
  //   } else {
  //     document.querySelector('.message').textContent = '💥 You lose the game!';
  //     document.querySelector('.score').textContent = 0;
  //   }
});

// 1. Select the element with the 'again' class and attach a click event handler
document.querySelector('.again').addEventListener('click', function (e) {
  e.preventDefault();
  // 1) Reset random number
  secretNumber = Math.floor(Math.random() * 20) + 1;
  // 2) Reset ? number
  document.querySelector('.number').textContent = '?';
  // 3) Reset score to 20
  score = 20;
  document.querySelector('.score').textContent = 20;
  // 4) Empty guess form
  document.querySelector('.guess').value = '';
  // 5) Update message to: "Start guessing..."
  displayMessage('Start guessing...');
  // Also restore the original background color (#222) and number width (15rem)
  document.body.style = 'background-color: #222';
  document.querySelector('.number').style.width = '15rem';
});

///////////////////////////////////////
// Coding Challenge #1

/* 
Implement a game rest functionality, so that the player can make a new guess! Here is how:

1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the score and secretNumber variables
3. Restore the initial conditions of the message, number, score and guess input field
4. Also restore the original background color (#222) and number width (15rem)

GOOD LUCK 😀
*/
