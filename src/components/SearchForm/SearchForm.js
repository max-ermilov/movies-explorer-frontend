import React from 'react';

import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search-form">
      <div className="container search-form__container">
        <form className="search-form__form">
          <div className="search-form__input-container">
            <input className="search-form__input"
                   type="search" name="search"
                   placeholder="Фильм"
                   aria-label="Найти фильм"
                   required
                   autoComplete="off"
            />
            <button className="button search-form__button"
                    type="submit">
              Поиск
            </button>
          </div>
          <FilterCheckbox/>
        </form>
      </div>
    </section>);
}

export default SearchForm;
