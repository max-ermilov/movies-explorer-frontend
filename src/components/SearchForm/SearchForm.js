import React from 'react';

import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({handleFilmSearch, handleFilmChange, filmSearchValue, showShortMovies, checkShorts}) {
  return (
    <section className="search-form">
      <div className="container search-form__container">
        <form className="search-form__form"
              onSubmit={handleFilmSearch}
              noValidate
        >
          <div className="search-form__input-container">
            <input className="search-form__input"
                   type="search" name="search"
                   placeholder="Фильм"
                   aria-label="Найти фильм"
                   required
                   autoComplete="off"
                   value={filmSearchValue || ''}
                   onChange={handleFilmChange}
            />
            <button className="button search-form__button"
                    type="submit">
              Поиск
            </button>
          </div>
          <FilterCheckbox showShortMovies={showShortMovies}
                          checkShorts={checkShorts}
          />
        </form>
      </div>
    </section>);
}

export default SearchForm;
