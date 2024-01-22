import 'core-js/stable';
import 'regenerator-runtime/runtime';

import recipeView from './view/recipeView';
import resultsView from './view/resultsView';
import searchView from './view/searchView';
import paginationView from './view/paginationView';
import bookmarkView from './view/bookmarkView';
import addRecipeView from './view/addRecipeView';

import * as model from './model';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controllRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    // 0) Update results view to mark selected search result
    await resultsView.update(model.getSearchResultsPage());

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Render recipe view
    recipeView.render(model.state.recipe);

    // Render bookmark view
    bookmarkView.render(model.state.bookmarks);
  } catch (err) {
    console.error(`${err} 💥💥💥💥💥`);
    recipeView.renderError();
  }
};

const controllSearchResults = async function () {
  // 1) Get search query
  const query = searchView.getQuery();
  if (!query) return;

  resultsView.renderSpinner();

  // 2) Load searched recipes
  await model.loadSearchRecipes(query);

  // 3) Render RESULTS
  resultsView.render(model.getSearchResultsPage());

  // 4) Render initial pagination buttons
  paginationView.render(model.state.search);
};

const controllPagination = async function (goToPage) {
  // 3) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 4) Render NEW pagnination buttons
  paginationView.render(model.state.search);
};

// window.addEventListener('hashchange', controllRecipe);
// window.addEventListener('load', controllRecipe);

const controllServings = async function (newServings) {
  // 1) Update the recipe servings (in state)
  model.updateServings(newServings);

  // 2) Render recipe view
  recipeView.update(model.state.recipe);
};

const controllMarkSelectedBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark();
  else model.deleteBookmark();

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3 )Render bookmark view
  bookmarkView.render(model.state.bookmarks);
};

const controllAddRecipe = async function (uploadRecipe) {
  // 1) Upload recipe by model
  console.log('uploadRecipe', uploadRecipe);
  await model.uploadRecipe(uploadRecipe);

  // 2) Store recipe to bookmarks local storage
  model.addBookmark();

  // 3) Render recipe by view
  recipeView.render(model.state.recipe);

  // 4) Render bookmark by view
  bookmarkView.render(model.state.bookmarks);

  // 5) Change ID in URL
  window.history.pushState(null, '', `#${model.state.recipe.id}`);

  // 6) Close modal add recipe by view
  addRecipeView.closeModal();
};

const init = function () {
  recipeView.addHandlerRender(controllRecipe);
  searchView.addHandlerSearch(controllSearchResults);
  paginationView.addHandlerClick(controllPagination);
  recipeView.addHandlerUpdateServings(controllServings);
  recipeView.addHandlerMarkSeletedBookmark(controllMarkSelectedBookmark);
  addRecipeView.addHandlerAddRecipe(controllAddRecipe);
};
init();
