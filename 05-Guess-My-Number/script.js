'use strict';
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = '👋  Correct number';

console.log(document.querySelector('.number').textContent);
document.querySelector('.number').textContent = 23;

console.log(document.querySelector('.score').textContent);
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 10;
console.log(document.querySelector('.guess').value);
