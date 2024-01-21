import 'core-js/stable';
import 'regenerator-runtime/runtime';

import recipeView from './view/recipeView';
import * as model from './model';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controllRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;

    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Render recipe view
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    // alert(err);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controllRecipe)
);

// window.addEventListener('hashchange', controllRecipe);
// window.addEventListener('load', controllRecipe);
