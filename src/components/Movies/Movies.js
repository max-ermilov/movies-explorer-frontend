import React, {useEffect, useState} from 'react';

import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {getMovies} from "../../utils/MoviesApi";
import {postMovie} from "../../utils/MainApi";
import {filterMovies} from "../../utils/filterMovies";
import {useCurrentWidth} from "../../hooks/useCurrentWidth";
import {getFirstRows, getLoadStep} from "../../utils/handlePagination";
import {DEFAULT_WIDTH} from "../../utils/constants";

function Movies({ setSavedMovies, savedMovies, deleteMovieCard, handlePopup /*setToolTip, submitButtonDisabled, setSubmitButtonDisabled*/ }) {
  const width = useCurrentWidth();
  const [movies, setMovies] = useState([]);
  const [filmSearchValue, setFilmSearchValue] = useState(getSearchStoreValue() || '');
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(getFirstRows(width || DEFAULT_WIDTH));
  const moviesInLocal = JSON.parse(localStorage.getItem('allMovies'));
  const [checkShorts, setCheckShorts] = useState(JSON.parse(localStorage.getItem('checkBox')) || false);
  const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('allMovies')) || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveMovieButtonDisabled, setIsSaveMovieButtonDisabled] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');



  function saveMovies(movie) {
    setIsSaveMovieButtonDisabled(true)
    postMovie(movie)
      .then((res) => {
        setSavedMovies([res, ...savedMovies]);
      })
      .catch((err) => {
        if (!err.message) {
          return err.json()
            .then(parsedError => handlePopup(parsedError.message));
        }
        handlePopup(err.message);
      })
      .finally(() => setIsSaveMovieButtonDisabled(false))
  }

  function handleLoadMore() {
    return setVisibleMoviesCount((prevCount) => prevCount + getLoadStep(width))
  }

  useEffect(() => {
    setIsError(false)
    const moviesToDisplay = filterMovies(allMovies, filmSearchValue, checkShorts)
    localStorage.setItem('filteredMovies', JSON.stringify(moviesToDisplay))
    localStorage.setItem('checkBox', checkShorts);
    const filteredMoviesInLocal = JSON.parse(localStorage.getItem('filteredMovies')) || [];

    setMovies(filteredMoviesInLocal);
    if (filteredMoviesInLocal.length === 0 && filmSearchValue.length > 0) {
      setIsLoading(false);
      setErrorText('Ничего не найдено');
      return setIsError(true);
    }
  }, [allMovies, checkShorts])

  function showShortMovies() {
    setCheckShorts(!checkShorts)
  }

  function getSearchStoreValue() {
    const searchStoreValue = localStorage.getItem('filmSearch');
    if (!searchStoreValue) {
      return '';
    }
    return searchStoreValue;
  }

  function handleFilmChange(e) {
    setFilmSearchValue(e.target.value)
  }

  function handleFilmSearch(e) {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);

    if (filmSearchValue === '') {
      setIsLoading(false);
      setErrorText('Нужно ввести ключевое слово');
      return setIsError(true);
    }
    if (!moviesInLocal) {
      getMovies()
        .then((res) => {
          setIsLoading(false);
          localStorage.setItem('allMovies', JSON.stringify(res));
          setAllMovies(res);
          localStorage.setItem('filmSearch', filmSearchValue);
        })
        .catch(() => {
          setIsError(true);
          setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
    else {
      setAllMovies(moviesInLocal);
      setIsLoading(false);
      localStorage.setItem('filmSearch', filmSearchValue);
    }
  }

  return (
    <main className="movies">
      <SearchForm handleFilmSearch={handleFilmSearch}
                  handleFilmChange={handleFilmChange}
                  filmSearchValue={filmSearchValue}
                  showShortMovies={showShortMovies}
                  checkShorts={checkShorts}
      />
      <MoviesCardList cards={movies}
                      isLoading={isLoading}
                      isError={isError}
                      visibleMoviesCount={visibleMoviesCount}
                      deleteMovieCard={deleteMovieCard}
                      handleLoadMore={handleLoadMore}
                      errorText={errorText}
                      saveMovies={saveMovies}
                      savedMovies={savedMovies}
                      isSaveMovieButtonDisabled={isSaveMovieButtonDisabled}
                      // submitButtonDisabled={submitButtonDisabled}
      />
    </main>);
}

export default Movies;
