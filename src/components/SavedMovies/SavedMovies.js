import React from 'react';

import SearchForm from "../SearchForm/SearchForm";
import './SavedMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies() {
  return (
    <main className="saved-movies">
      <SearchForm/>
      <MoviesCardList/>
    </main>);
}

export default SavedMovies;
