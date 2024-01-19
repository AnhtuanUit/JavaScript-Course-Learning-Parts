'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// Our First AJAX Call: XMLHttpRequest

/* const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `<article class="country">
          <img class="country__img" src="${data?.flags?.png}" />
          <div class="country__data">
            <h3 class="country__name">${data?.name?.official}</h3>
            <h4 class="country__region">${data?.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data?.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${
              Object.entries(data?.languages)?.[0][1]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.entries(data?.currencies)?.[0]?.[1]?.name
            }</p>
          </div>
        </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('portugal');
getCountryData('vietnam');
getCountryData('usa');
getCountryData('japan'); */

////////////////////////////////////////////////
// Welcome to Callback Hell
const renderCountry = function (data, className) {
  const html = `<article class="country ${className}"">
          <img class="country__img" src="${data?.flags?.png}" />
          <div class="country__data">
            <h3 class="country__name">${data?.name?.official}</h3>
            <h4 class="country__region">${data?.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data?.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${
              Object.entries(data?.languages)?.[0][1]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.entries(data?.currencies)?.[0]?.[1]?.name
            }</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
/* 
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function (response) {
    console.log(response);
    const [data] = JSON.parse(response.target.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country 2
    const [neighbour] = data.borders;

    if (!neighbour) return;

    console.log('neighbour', neighbour);
    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open(
      'GET',
      `https://restcountries.com/v3.1/name/${neighbour.toLowerCase()}`
    );

    request2.send();

    request2.addEventListener('load', function (response2) {
      console.log(response2);
      const [data2] = JSON.parse(response2.target.responseText);
      console.log(data2, 'neighbour');
      // Render neighbour
      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('vietnam');
getCountryAndNeighbour('usa');

setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 second passed');
    setTimeout(() => {
      console.log('# second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
 */

////////////////////////////////////////////////
// Consuming Promises
// Chaining Promise
// Handling Rejected Promises
// Throwing Erros Manually

// const getJSON = (url, errMsg) => {

// }
const getJSON = (url, errMsg) =>
  fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errMsg} (${reponse.status})`);
    return response.json();
  });

const renderError = msg => {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  // Get data country 1 by fetch
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const [neighbour] = data?.[0].borders;

      if (!neighbour) throw new Error('Neighbour does not exist');

      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/name/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.log(err);
      console.log(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  // getCountryData('portugal');
  getCountryData('usa');
});
