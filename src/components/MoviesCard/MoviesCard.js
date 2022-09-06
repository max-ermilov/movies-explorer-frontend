import React, {useState} from 'react';
import { Route, Switch} from "react-router-dom";

import './MoviesCard.css';

function MoviesCard({ movie }) {
  const [isSaved, setIsSaved] = useState(false);

  function handleClickSave() {
    setIsSaved(!isSaved);
  };

  const formatDuration = durationInMinutes => {
    let hours = parseInt(durationInMinutes / 60);
    hours = (!hours) ? "" : `${hours}ч `;
    let minutes = durationInMinutes % 60;
    minutes = (!minutes) ? "" : `${minutes}м`;
    return `${hours}${minutes}`
  };
  return (
    <li className="movies-card" >
      <a href={movie.trailerLink}
         target="_blank"
         rel="noreferrer"
         className="movies-card__link">
        <img className="movies-card__image"
             src={movie.image.url}
             alt={movie.nameRU}
        />
      </a>
      <div className="movies-card__name-container">
        <h2 className="movies-card__name">{movie.nameRU}</h2>
        <Switch>
          <Route path="/movies">
        <button onClick={handleClickSave}
                className={`button movies-card__button movies-card__save-button ${isSaved && "movies-card__save-button_active"}`}
                aria-label="Добавить в сохранённые">
        </button>
          </Route>
          <Route path="/saved-movies">
            <button onClick={handleClickSave}
                    className="button movies-card__button movies-card__delete-button"
                    aria-label="Удалить из сохранённых">
            </button>
          </Route>
        </Switch>
      </div>
      <p className="movies-card__duration">{formatDuration(movie.duration)}</p>
    </li>
  );
}

export default MoviesCard;
