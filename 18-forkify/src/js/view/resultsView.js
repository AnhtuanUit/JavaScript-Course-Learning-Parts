import View from './View';
import icons from 'url:../../img/icons.svg';

class ResultView extends View {
  _data;
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try again!';
  _message = '';

  _generateMarkup() {
    return this._data
      .map(recipe => this._generateResultMarkup(recipe))
      .join('');
  }

  _generateResultMarkup(recipe) {
    return `<li class="preview">
      <a class="preview__link" href="#${recipe.id}">
        <figure class="preview__fig">
          <img src="${recipe.image_url}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${recipe.title}</h4>
          <p class="preview__publisher">${recipe.publisher}</p>
        </div>
      </a>
    </li>`;
  }
}

export default new ResultView();
