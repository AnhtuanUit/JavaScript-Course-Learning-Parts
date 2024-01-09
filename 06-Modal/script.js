'use strict';

const model = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseMoal = document.querySelector('.close-modal');
const btnsOpenMoal = document.querySelectorAll('.show-modal');

const openModal = function () {
  model.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  model.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenMoal.length; i++)
  btnsOpenMoal[i].addEventListener('click', openModal);
btnCloseMoal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
