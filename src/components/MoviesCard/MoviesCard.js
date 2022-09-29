// import {useState} from 'react';
import {useLocation} from "react-router-dom";
import {formatMovieDuration} from "../../utils/formatMovieDuration";
import {MOVIES_API_URL} from "../../utils/constants";

import './MoviesCard.css';

function MoviesCard({
                      card,
                      saveMovies,
                      deleteMovieCard,
                      savedMovies,
                      isSaveMovieButtonDisabled,
                      isDeleteMovieButtonDisabled
                    }) {
  const location = useLocation();
  const isSaved = card.id ? savedMovies.map((i) => i.movieId).includes(card.id)
    : location.pathname === '/saved-movies' ? true : '';

  function handleSave() {
    saveMovies({
      country: card.country,
      director: card.director,
      duration: card.duration,
      year: card.year,
      description: card.description,
      image: `${MOVIES_API_URL}/${card.image.url}`,
      trailerLink: card.trailerLink,
      nameRU: card.nameRU,
      nameEN: card.nameEN,
      thumbnail: `${MOVIES_API_URL}/${card.image.formats.thumbnail.url}`,
      movieId: card.id,
    })
  }

  function handleDelete() {
    if (location.pathname === '/saved-movies') {
      deleteMovieCard(card)
    }
    if (location.pathname === '/movies')
      deleteMovieCard(savedMovies.find((i) => i.movieId === card.id))
  }

  return (
    <li className="movies-card">
      <a href={card.trailerLink}
         target="_blank"
         rel="noreferrer"
         className="link movies-card__link">
        <img className="movies-card__image"
             src={location.pathname === '/saved-movies' ? `${card.image}` : `${MOVIES_API_URL}${card.image.url}`}
             alt={`Постер фильма ${card.nameRU}`}
        />
      </a>
      <div className="movies-card__name-container">
        <h2 className="movies-card__name">{card.nameRU}</h2>
        {location.pathname === '/saved-movies' &&
          <button type="button"
                  className="button movies-card__button movies-card__delete-button"
                  aria-label="Удалить из сохранённых"
                  onClick={handleDelete}
                  disabled={isDeleteMovieButtonDisabled}
          >
          </button>}
        {location.pathname === '/movies' &&
          <button onClick={isSaved ? handleDelete : handleSave}
                  type="button"
                  className={`button movies-card__button movies-card__save-button ${isSaved && "movies-card__save-button_active"}`}
                  aria-label="Добавить в сохранённые"
                  disabled={isSaveMovieButtonDisabled}
          >
          </button>}

      </div>
      <p className="movies-card__duration">{formatMovieDuration(card.duration)}</p>
    </li>
  );
}

export default MoviesCard;
