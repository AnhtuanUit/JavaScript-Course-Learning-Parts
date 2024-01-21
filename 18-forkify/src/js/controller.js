import 'core-js/stable';
import 'regenerator-runtime/runtime';

import recipeView from './view/recipeView';
import searchView from './view/searchView';
import * as model from './model';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controllSearchResults = async function () {
  // 1) Get search query
  const query = searchView.getQuery();
  if (!query) return;

  // 2) Load searched recipes
  await model.loadSearchRecipes(query);
  console.log(model.state.search);
  // 3) Render searched recipes
};

const controllRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Render recipe view
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(`${err} 💥💥💥💥💥`);
    recipeView.renderError();
  }
};

// window.addEventListener('hashchange', controllRecipe);
// window.addEventListener('load', controllRecipe);

const init = function () {
  recipeView.addHandlerRender(controllRecipe);
  searchView.addHandlerSearch(controllSearchResults);
};
init();
