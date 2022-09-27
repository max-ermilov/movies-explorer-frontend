import {MOVIES_API_URL} from "./constants";
import checkResponse from "./checkResponse";

export const getMovies = () => {
  return fetch(`${MOVIES_API_URL}/beatfilm-movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => checkResponse(res));
};
