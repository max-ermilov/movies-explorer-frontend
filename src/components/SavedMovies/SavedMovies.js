import {useState, useEffect} from 'react';

import SearchForm from "../SearchForm/SearchForm";
import './SavedMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {filterMovies} from "../../utils/filterMovies";

function SavedMovies({ savedMovies, deleteMovieCard, isLoading, submitButtonDisabled }) {
  const [film, setFilm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [checkShorts, setCheckShorts] = useState(false);
  const [doSearch, setDoSearch] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (savedMovies.length > 0) {
      setSearchResult(savedMovies)
    }
  }, [savedMovies])

  useEffect(() => {
    if (savedMovies.length === 0) {
      setSearchResult(savedMovies)
    }
  }, [deleteMovieCard])

  useEffect(() => {
    const filteredMovies = filterMovies(savedMovies, film, checkShorts)
    setSearchResult(filteredMovies)
    setDoSearch(false)
    setIsError(false)

    if (filteredMovies.length === 0 && film.length > 0) {
      setErrorText('Ничего не найдено');
      return setIsError(true);
    }
  }, [doSearch, checkShorts])

  function showShortMovies() {
    setCheckShorts(!checkShorts)
  }

  function handleFilmSearch(e) {
    e.preventDefault();
    if (film === '') {
      setErrorText('Нужно ввести ключевое слово');
      return setIsError(true);
    }
    else {
      setDoSearch(true)
    }
  }

  function handleFilmChange(e) {
    setFilm(e.target.value)
  }

  return (
    <main className="saved-movies">
      <SearchForm handleFilmSearch={handleFilmSearch}
                  handleFilmChange={handleFilmChange}
                  filmSearchValue={film}
                  showShortMovies={showShortMovies}
                  checkShorts={checkShorts}
      />
      <MoviesCardList cards={searchResult}
                      deleteMovieCard={deleteMovieCard}
                      isLoading={isLoading}
                      isError={isError}
                      errorText={errorText}
                      submitButtonDisabled={submitButtonDisabled}
      />
    </main>);
}

export default SavedMovies;
