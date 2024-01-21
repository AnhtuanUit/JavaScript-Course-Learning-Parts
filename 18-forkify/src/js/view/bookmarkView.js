import View from './View';
import icons from 'url:../../img/icons.svg';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _data;

  _generateMarkup() {
    if (Object.values(this._data).length) {
      return Object.values(this._data)
        .map(this._generateMarkupBookmark)
        .join('');
    } else {
      return `<div class="message">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>
          No bookmarks yet. Find a nice recipe and bookmark it :)
        </p>
      </div>`;
    }
  }

  _generateMarkupBookmark(bookmark) {
    return `<li class="preview">
      <a class="preview__link " href="#${bookmark.id}">
        <figure class="preview__fig">
          <img src="${bookmark.imageUrl}" alt="How to Grill Pizza">
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${bookmark.title}</h4>
          <p class="preview__publisher">${bookmark.publisher}</p>
          <div class="preview__user-generated hidden">
            <svg>
            <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>`;
  }
}

export default new BookmarkView();
