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
    if (!response.ok) throw new Error(`${errMsg} (${response.status})`);
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
  // TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
  // TEST COORDINATES 2: 19.037, 72.873
  // TEST COORDINATES 2: -33.933, 18.474
  const coords1 = [52.508, 13.381];
  const coords2 = [19.037, 72.873];
  const coords3 = [-33.933, 18.474];

  whereAmI(...coords1).then(country => {
    // getCountryData('portugal');
    return country && getCountryData(country);
  });

  whereAmI(...coords2).then(country => {
    // getCountryData('portugal');
    return country && getCountryData(country);
  });

  whereAmI(...coords3).then(country => {
    // getCountryData('portugal');
    return country && getCountryData(country);
  });
});

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// 1.
const whereAmI = function (lat, lng) {
  // 2.
  return (
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
      .then(response => {
        console.log(response);

        return response.json();
      })
      .then(data => {
        if (!data.country) {
          throw new Error('Limit 3 requests per second');
        }
        console.log(data);
        // 3.
        console.log(`You are in ${data.state}, ${data.country}`);
        return data.country;
      })
      // 4.
      .catch(err => console.log(err))
  );
};
