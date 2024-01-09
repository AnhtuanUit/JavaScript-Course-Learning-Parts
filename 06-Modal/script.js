'use strict';

const model = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseMoal = document.querySelector('.close-modal');

const btnsOpenMoal = document.querySelectorAll('.show-modal');

for (let i = 0; i < btnsOpenMoal.length; i++) {
  console.log(btnsOpenMoal[i].textContent);
}
