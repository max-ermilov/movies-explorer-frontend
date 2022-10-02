import {SHORT_MOVIES_DURATION} from "./constants";

export const filterMovies = (moviesList, searchValue, checkShorts) => {
  return moviesList.filter(({nameRU, duration}) => {
    if (!checkShorts) {
      return nameRU.toLowerCase()
          .includes(searchValue.toLowerCase()) &&
        (duration > SHORT_MOVIES_DURATION);
    }
    return nameRU.toLowerCase()
        .includes(searchValue.toLowerCase()) &&
      (duration <= SHORT_MOVIES_DURATION);
  });
}
