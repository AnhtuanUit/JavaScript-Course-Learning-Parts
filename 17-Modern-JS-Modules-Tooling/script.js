// Exporting module
// Importing module
import { addToCart, totalPrice as price, tq } from './shoppingCart.js';

addToCart('bread', 5);
addToCart('bread', 5);
console.log(price, tq);

// Importing module
console.log('Importing module');
// console.log(shippingCost);

import * as ShoppingCart from './shoppingCart.js';

ShoppingCart.addToCart('bread', 6);
console.log(ShoppingCart.totalPrice);

// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';

// console.log(price);

import add, { cart } from './shoppingCart.js';
add('pizza', 3);
add('bread', 5);
add('follower', 10);

console.log(cart);
