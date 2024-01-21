import View from './View';

class Pagination extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const { page, resultsPerPage, results } = this._data;
    const totalPage = Math.ceil(results.length / resultsPerPage);

    // Page 1, no next page
    if (page === 1 && totalPage === 1) return '';
    // Page 1, have next page
    if (page === 1 && totalPage > 1) return this._generateMarkupNextBtn(page);

    // Last page
    if (page > 1 && page === totalPage)
      return this._generateMarkupPrevBtn(page);

    // Orther page
    if (page > 1 && page < totalPage)
      return (
        this._generateMarkupPrevBtn(page) + this._generateMarkupNextBtn(page)
      );
  }

  _generateMarkupPrevBtn(currPage) {
    return `<button class="btn--inline pagination__btn--prev" data-goto="${
      currPage - 1
    }">
    <svg class="search__icon">
      <use href="src/img/icons.svg#icon-arrow-left"></use>
    </svg>
    <span>Page ${currPage - 1}</span>
  </button>`;
  }

  _generateMarkupNextBtn(currPage) {
    return `<button class="btn--inline pagination__btn--next" data-goto="${
      currPage + 1
    }">
    <span>Page ${currPage + 1}</span>
    <svg class="search__icon">
      <use href="src/img/icons.svg#icon-arrow-right"></use>
    </svg>
  </button>`;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      handler(+btn.dataset.goto);
    });
  }
}

export default new Pagination();
