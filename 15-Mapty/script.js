'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const {
        coords: { latitude, longitude },
      } = position;
      console.log(latitude, longitude);
      console.log(
        `https://www.google.com/maps/search/${latitude},+${longitude}?entry=tts`
      );
      const coords = [latitude, longitude];
      const map = L.map('map').setView(coords, 13);

      L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS3 popup. <br/> Easyly customizable.')
        .openPopup();
    },
    function () {
      alert('Could not get your position');
    }
  );
}
