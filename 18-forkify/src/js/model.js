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
  bookmarks: {},
};

export const loadRecipe = async function (id) {
  try {
    // Load localstorage bookmakrs
    if (JSON.stringify(state.bookmarks) === '{}') init();

    // Priority load bookmark recipe
    if (state.bookmarks[id]) {
      return (state.recipe = state.bookmarks[id]);
    }

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

    // Mark current recipe bookmark status
    state.recipe.bookmarked = !!state.bookmarks[id];
  } catch (err) {
    throw err;
  }
};

export const loadSearchRecipes = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
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
export const deleteBookmark = function () {
  // Delete bookmark
  delete state.bookmarks[state.recipe.id];

  // Mark current recipe as NOT bookmarked
  state.recipe.bookmarked = false;

  persistBookmarks();
};

export const addBookmark = function () {
  // Add bookmark
  state.bookmarks[state.recipe.id] = state.recipe;

  // Mark current recipe as bookmarked
  state.recipe.bookmarked = true;
  persistBookmarks();
};

export const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const uploadRecipe = async function (uploadRecipe) {
  // FAKE UPLOAD RECIPE in 1.5 seconds
  const data = await new Promise(resolv => setTimeout(resolv, 1_500));

  // Parse ingredients from upload reciep data
  const ingredients = [1, 2, 3, 4, 5, 6]
    .map(i => {
      const values = uploadRecipe[`ingredient-${i}`].split(',');
      // Guard
      if (values.length !== 3) return undefined;
      // Format
      const [quantity, unit, description] = values;
      return { quantity: +quantity, unit, description };
    })
    .filter(ing => ing);

  // Update recipe state
  state.recipe = {
    publisher: uploadRecipe.publisher,
    ingredients,
    sourceUrl: uploadRecipe.sourceUrl,
    imageUrl: uploadRecipe.image,
    title: uploadRecipe.title,
    servings: +uploadRecipe.servings,
    cookingTime: +uploadRecipe.cookingTime,
    id: `${Date.now()}`.slice(-10),
    bookmarked: true,
  };
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage) || {};
  console.log('SUCCESS LOAD LOCAL STORAGE', state.bookmarks);
};

init();
