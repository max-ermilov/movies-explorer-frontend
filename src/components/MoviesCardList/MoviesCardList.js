import React from 'react';
import {useLocation} from "react-router-dom";

import './MoviesCardList.css';
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
                          cards,
                          isLoading,
                          isError,
                          visibleMoviesCount,
                          deleteMovieCard,
                          handleLoadMore,
                          errorText,
                          saveMovies,
                          isSaveMovieButtonDisabled,
                          isDeleteMovieButtonDisabled,
                          savedMovies,
                        }) {
  const location = useLocation();

  return (

    <section className="movies-card-list">
      <div className="container movies-card-list__container">
        {isLoading ? <Preloader/> : isError ?
          <p className="movies-card-list__no-results">
            {errorText}
          </p> : <>
            <ul className="movies-card-list__list">
              {location.pathname === '/movies' && cards.slice(0, visibleMoviesCount)
                .map((card) => (
                  <MoviesCard card={card}
                              key={card.id}
                              savedMovies={savedMovies}
                              deleteMovieCard={deleteMovieCard}
                              saveMovies={saveMovies}
                              isSaveMovieButtonDisabled={isSaveMovieButtonDisabled}
                  />
                ))
              }
              {location.pathname === '/saved-movies' && cards.map((card) => (
                <MoviesCard card={card}
                            key={card.movieId}
                            deleteMovieCard={deleteMovieCard}
                            saveMovies={saveMovies}
                            isDeleteMovieButtonDisabled={isDeleteMovieButtonDisabled}
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
          </>}
      </div>
    </section>);
}

export default MoviesCardList;
