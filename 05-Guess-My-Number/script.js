'use strict';

document.querySelector('.check').addEventListener('click', function (e) {
  e.preventDefault();
  const guess = document.querySelector('.guess').value;
  if (!guess) {
    document.querySelector('.message').textContent = '⛔️ No number!';
  }
});
