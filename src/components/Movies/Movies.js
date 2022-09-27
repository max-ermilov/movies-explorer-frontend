import React, {useEffect, useState} from 'react';

import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {getMovies} from "../../utils/MoviesApi";
import {postMovie} from "../../utils/MainApi";
import {filterMovies} from "../../utils/filterMovies";

function Movies({ setSavedMovie, savedMovies, deleteMovieCard, /*setToolTip, submitButtonDisabled, setSubmitButtonDisabled*/ }) {
  const [movies, setMovies] = useState([]);
  const [filmSearchValue, setFilmSearchValue] = useState(getSearchStoreValue());
  const [width, setWidth] = useState(window.innerWidth);
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(getFirstRows(width));
  const moviesInLocal = JSON.parse(localStorage.getItem('allMovies'));
  const [checkShorts, setCheckShorts] = useState(JSON.parse(localStorage.getItem('checkBox')) || false);
  const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('allMovies')) || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  function saveMovies(movie) {
    // setSubmitButtonDisabled(true)
    postMovie(movie)
      .then((res) => {
        setSavedMovie([res, ...savedMovies])
      })
      .catch((err) => {
        // setToolTip(true)
      })
      // .finally(() => setSubmitButtonDisabled(false))
  }

  useEffect(() => {
    function handleWindowSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleWindowSize)
    return () => window.removeEventListener('resize', handleWindowSize)
  }, [width])

  function getFirstRows(width) {
    if (width >= 1280) {
      return 12;
    }
    if (width >= 768) {
      return 8;
    }
    else {
      return 5;
    }
  }

  const getLoad = (width) => {
    if (width >= 1280) {
      return 3;
    }
    return 2;
  }

  function handleLoadMore() {
    return setVisibleMoviesCount((prevCount) => prevCount + getLoad(width))
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
                      // submitButtonDisabled={submitButtonDisabled}
      />
    </main>);
}

export default Movies;
