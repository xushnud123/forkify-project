import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (this._data.page === 1 && numPages > 1) {
      return this._getNext();
    }
    if (this._data.page === numPages) {
      return this._getPrev();
    }
    if (1 < this._data.page < numPages && numPages > 1) {
      return `
      ${this._getPrev()}
      ${this._getNext()}`;
    }
  }

  _getNext() {
    return `
   <button data-goto="${
     this._data.page + 1
   }" class="btn--inline pagination__btn--next">
   <span>Page ${this._data.page + 1}</span>
   <svg class="search__icon">
     <use href="${icons}#icon-arrow-right"></use>
   </svg>
 </button>`;
  }
  _getPrev() {
    return `
   <button data-goto="${
     this._data.page - 1
   }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this._data.page - 1}</span>
    </button>
   `;
  }
}

export default new PaginationView();
