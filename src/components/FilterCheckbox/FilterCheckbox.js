import React from 'react';

import './FilterCheckbox.css';

function FilterCheckbox({ showShortMovies, checkShorts }) {
  return (
      <label className="filter-checkbox" >
        <input className="filter-checkbox__checkbox"
               type="checkbox"
               value={checkShorts}
               defaultChecked={checkShorts}
               onChange={showShortMovies}
        />
        <span className="filter-checkbox__checkbox-visualization" />
        <span className="filter-checkbox__label-text">Короткометражки</span>
      </label>
  );
}

export default FilterCheckbox;
