class SearchView {
  #parentElement = document.querySelector('.search');

  constructor() {}

  getQuery() {
    const query = this.#parentElement.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener('submit', e => {
      e.preventDefault();
      console.log('CLICK');
      handler();
    });
  }
}

export default new SearchView();
