import View from './View';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _btnAddRecipe = document.querySelector('.nav__btn--add-recipe');
  _btnCloseModal = document.querySelector('.btn--close-modal');
  _formAddRecipe = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');

  constructor() {
    super();
    this._addHandlerOpenCloseModal();
  }

  _generateMarkup() {}

  _openModal() {
    this._overlay.classList.remove('hidden');
    this._window.classList.remove('hidden');
  }

  closeModal() {
    this._overlay.classList.add('hidden');
    this._window.classList.add('hidden');
  }

  _addHandlerOpenCloseModal() {
    [this._btnCloseModal, this._overlay].forEach(el =>
      el.addEventListener('click', this.closeModal.bind(this))
    );
    this._btnAddRecipe.addEventListener('click', this._openModal.bind(this));
  }

  addHandlerAddRecipe(handler) {
    const seft = this;
    this._formAddRecipe.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = [...new FormData(this)];
      const data = Object.fromEntries(formData);
      handler(data);
    });
  }
}

export default new AddRecipeView();
