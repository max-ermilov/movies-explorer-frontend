import {SHORT_MOVIES_DURATION} from "./constants";

export const filterMovies = (allMovies, film, checkShorts) => {
  return allMovies.filter((movieCard) => {
    if (checkShorts === false) {
      return movieCard.nameRU.toLowerCase().includes(film.toLowerCase())
    }
    if (checkShorts === true) {
      return movieCard.nameRU.toLowerCase().includes(film.toLowerCase()) && movieCard.duration <= SHORT_MOVIES_DURATION;
    }
  });
}
