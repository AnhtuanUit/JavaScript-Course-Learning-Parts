import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      publisher: recipe.publisher,

      ingredients: recipe.ingredients,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
      title: recipe.title,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      id: recipe.id,
    };
    console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const loadSearchRecipes = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);
    state.search.results = data?.data?.recipes;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9

  return state.search.results.slice(start, end);
};

export const updateServings = async function (newServing) {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity *= newServing / state.recipe.servings;
  });
  state.recipe.servings = newServing;
};
