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
      const [neighbour, neighbour2, neighbour3] = data?.[0].borders;

      if (!neighbour) throw new Error('Neighbour does not exist');

      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/name/${
          neighbour3 || neighbour2 || neighbour
        }`,
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

// btn.addEventListener('click', function () {
//   // TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
//   // TEST COORDINATES 2: 19.037, 72.873
//   // TEST COORDINATES 2: -33.933, 18.474
//   const coords1 = [52.508, 13.381];
//   const coords2 = [19.037, 72.873];
//   const coords3 = [-33.933, 18.474];

//   whereAmI(...coords1).then(country => {
//     // getCountryData('portugal');
//     return country && getCountryData(country);
//   });

//   whereAmI(...coords2).then(country => {
//     // getCountryData('portugal');
//     return country && getCountryData(country);
//   });

//   whereAmI(...coords3).then(country => {
//     // getCountryData('portugal');
//     return country && getCountryData(country);
//   });
// });

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
/* const whereAmI = function (lat, lng) {
  // 2.
  return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
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
    });
  // 4.
  // .catch(err => console.log(err))
}; */

////////////////////////////////////////////////
// Promisifying the Geolocation API
const getPosition = function () {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
};

btn.addEventListener('click', function () {
  getPosition()
    .then(data => {
      const { latitude, longitude } = data?.coords;
      return whereAmI(latitude, longitude);
    })
    .then(country => {
      // getCountryData('portugal');
      return country && getCountryData(country);
    })
    .catch(err => {
      console.log(err);
      console.log(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again`);
    });
});

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/
// PART 1

/* const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

// wait(3).then(b => console.log(b));

// 2.

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    console.log('Loading image', imgPath);
    const imageEl = document.createElement('img');
    imageEl.alt = 'Image of Coding Challenge #2';
    imageEl.src = imgPath;

    imageEl.addEventListener('load', () => {
      // Addpend to DOM
      imgContainer.append(imageEl);

      resolve(imageEl);
    });
    imageEl.addEventListener('error', function (e) {
      reject(new Error(`Image not found ${imgPath}`));
    });
  });
};

// PART 2
// 1.
let imgEl2, imgEl;
createImage('img/img-1.jpg')
  .then(iEl => {
    imgEl = iEl;
    // 3.
    return wait(2);
  })
  .then(() => {
    imgEl.style.display = 'none';
    // 4. Create second img
    return wait(2);
  })
  .then(() => createImage('img/img-2.jpg'))
  .then(iEl2 => {
    imgEl2 = iEl2;
    // 5.
    return wait(2);
  })
  .then(() => {
    // 6.
    imgEl2.style.display = 'none';
  })
  .catch(err => {
    renderError(`Load image error`);
  }); */

// createImage('img/img-1.jpg').catch(err =>
//   renderError(`Load image error: ${err.message}`)
// );
// createImage('img/img-2.jpg').catch(err =>
//   renderError(`Load image error: ${err.message}`)
// );
// createImage('img/img-3.jpg').catch(err =>
//   renderError(`Load image error: ${err.message}`)
// );

////////////////////////////////////////////////
// Consuming Promises with Async/Await
// Error Handling With try...catch

const whereAmI = async function () {
  try {
    // Get geo location
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding for country name
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    console.log(resGeo);
    const dataGeo = await resGeo.json();
    if (!dataGeo.country) throw new Error('Limit 3 requests per second');
    console.log(dataGeo);

    // Country dataGeo
    const countryRes = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    const countryData = await countryRes.json();
    if (!countryData?.[0]) throw new Error('Problem getting country');
    console.log(countryData);
    renderCountry(countryData[0]);
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.log(`💥`, err);
    renderError(`💥 ${err.message}`);
    throw err;
  }
};

// whereAmI();
////////////////////////////////////////////////
// Returning Values from Async Functions
// console.log('Step 1');
// whereAmI()
//   .then(data => console.log('Step 2', data))
//   .catch(err => console.log(`Step 2 💥 ${err.message}`))
//   .finally(() => {
//     console.log('Step 3');
//   });

// console.log('Step 4');

// IIFE
/* (async () => {
  console.log('Step 1');
  try {
    const data = await whereAmI();
    console.log('Step 2', data);
  } catch (err) {
    console.log(`Step 2 💥 ${err.message}`);
  }
  console.log('Step 4');
})(); */

////////////////////////////////////////////////
// Running Promieses in Paralel

/* const get3Countries = async (c1, c2, c3) => {
  // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`, 'Country not found');
  // await getJSON(`https://restcountries.com/v3.1/name/${c1}`, 'Country not found')
  // await getJSON(`https://restcountries.com/v3.1/name/${c2}`, 'Country not found')
  // await  getJSON(`https://restcountries.com/v3.1/name/${c3}`, 'Country not found')
  const data = await Promise.all([
    getJSON(`https://restcountries.com/v3.1/name/${c1}`, 'Country not found'),
    getJSON(`https://restcountries.com/v3.1/name/${c2}`, 'Country not found'),
    getJSON(`https://restcountries.com/v3.1/name/${c3}`, 'Country not found'),
  ]);

  data.map(item => console.log(item));
};

get3Countries('vietnam', 'usa', 'japan');
 */

////////////////////////////////////////////////
//  Other Promise Combinators: race, allSettled and any

// Promise.race
/* 
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/vietnam`),
    getJSON(`https://restcountries.com/v3.1/name/japan`),
    getJSON(`https://restcountries.com/v3.1/name/usa`),
  ]);
  console.log(res);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/vietnam`),
  timeout(5),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any [ES2021]
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

Promise.any([
  Promise.reject('ERROR'),
  Promise.reject('ERROR'),
  Promise.reject('ERROR'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

 */

////////////////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

// PART 1
const imgContainer = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    console.log('Loading image', imgPath);
    const imageEl = document.createElement('img');
    imageEl.alt = 'Image of Coding Challenge #2';
    imageEl.src = imgPath;

    imageEl.addEventListener('load', () => {
      // Addpend to DOM
      imgContainer.append(imageEl);

      resolve(imageEl);
    });
    imageEl.addEventListener('error', function (e) {
      reject(new Error(`Image not found ${imgPath}`));
    });
  });
};

const wait = sec => {
  return new Promise(resolve => {
    setTimeout(resolve, sec * 1000);
  });
};
const loadNPause = async () => {
  try {
    const imgEl1 = await createImage('img/img-1.jpg');
    await wait(2);
    imgEl1.style.display = 'none';
    await wait(2);
    const imgEl2 = await createImage('img/img-2.jpg');
    await wait(2);
    imgEl2.style.display = 'none';
  } catch (err) {
    renderError(`Load image error ${err.message}`);
  }
};
// loadNPause();

// PART 2
// 1.
// 2.
const loadAll = async imgs => {
  try {
    const imageEls = await Promise.all(imgs.map(img => createImage(img)));
    console.log(imageEls);
    imageEls.forEach(imgEl => {
      console.log(imgEl);
      imgEl.classList.add('paralell');
    });
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
