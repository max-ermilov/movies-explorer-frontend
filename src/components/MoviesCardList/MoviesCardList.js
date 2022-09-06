import React from 'react';

import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import cardsList from "../../utils/initialEmptyMoviesCardsList";

function MoviesCardList() {
  return (
    <section className="movies-card-list">
      {(cardsList.length === 0) ? (
        <p className="movies-card-list__no-results">
          По данному запросу фильмы не найдены
        </p>
      ) : (
        <div className="container movies-card-list__container">
          <ul className="movies-card-list__list">
            {cardsList.map(
              movie => <MoviesCard
                movie={movie}
                key={movie.id}
              />
            )}
          </ul>
          <button
            className="button movies-card-list__button-more"
            type="button"
            aria-label="Загрузить ещё"
          >Ещё
          </button>
        </div>
      )
      }
    </section>);
}

export default MoviesCardList;
