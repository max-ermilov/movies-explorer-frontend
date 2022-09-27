import React from 'react';
import {useLocation} from "react-router-dom";

import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
                          cards,
                          // isLoading,
                          isError,
                          visibleMoviesCount,
                          deleteMovieCard,
                          handleLoadMore,
                          errorText,
                          saveMovies,
                          savedMovies,
                          // submitButtonDisabled,
                        }) {
  const location = useLocation();

  return (

    <section className="movies-card-list">
      {isError ?
        <p className="movies-card-list__no-results">
          {errorText}
        </p> : <>
          <div className="container movies-card-list__container">
            <ul className="movies-card-list__list">
              {location.pathname === '/movies' && cards.slice(0, visibleMoviesCount)
                .map((card) => (
                  <MoviesCard card={card}
                              key={card.id}
                              savedMovies={savedMovies}
                              deleteMovieCard={deleteMovieCard}
                              saveMovies={saveMovies}
                              // submitButtonDisabled={submitButtonDisabled}
                  />
                ))
              }
              {location.pathname === '/saved-movies' && cards.map((card) => (
                <MoviesCard card={card}
                            key={card.movieId}
                            deleteMovieCard={deleteMovieCard}
                            saveMovies={saveMovies}
                            // submitButtonDisabled={submitButtonDisabled}
                />
              ))
              }
            </ul>
            {location.pathname === '/movies' && visibleMoviesCount < cards.length &&
              <button
                className="button movies-card-list__button-more"
                type="button"
                aria-label="Загрузить ещё"
                onClick={handleLoadMore}
              >Ещё
              </button>
            }
          </div>
        </>}
    </section>);
}

export default MoviesCardList;
