import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {},
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

export const loadSearchRecipes = async function (searchQuery) {
  try {
    const data = await getJSON(`${API_URL}?search=${searchQuery}`);
    console.log(data);
    state.search = data?.data;
  } catch (err) {
    throw err;
  }
};
