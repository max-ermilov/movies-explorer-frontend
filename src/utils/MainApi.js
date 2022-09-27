import {MAIN_API_URL} from './constants';
import checkResponse from "./checkResponse";

const headersWithToken = () => {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
};

export const register = ({email, password, name}) => {
  return fetch(`${MAIN_API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password, name})
  })
    .then(res => checkResponse(res));
};


export const login = ({email, password}) => {
  return fetch(`${MAIN_API_URL}/signin`, {
    method: 'POST',
    headers: headersWithToken(),
    body: JSON.stringify({email, password})
  })
    .then(res => checkResponse(res));
};

export const getUserCredentials = () => {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: 'GET',
    headers: headersWithToken()
  })
    .then(res => checkResponse(res));
};

export const patchUser = (user) => {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: 'PATCH',
    headers: headersWithToken(),
    body: JSON.stringify({
      name: user.name,
      email: user.email
    }),
  })
    .then(res => checkResponse(res));
}

export const postMovie = (movieToPost) => {
  return fetch(`${MAIN_API_URL}/movies`, {
    method: 'POST',
    headers: headersWithToken(),
    body: JSON.stringify(movieToPost)
  })
    .then((res) => checkResponse(res))
}

export const deleteMovie = (id) => {
  return fetch(`${MAIN_API_URL}/movies/${id}`, {
    method: 'DELETE',
    headers: headersWithToken()
  })
    .then((res) => checkResponse(res))
}

export const getMovie = () => {
  return fetch(`${MAIN_API_URL}/movies`, {
    method: 'GET',
    headers: headersWithToken()
  })
    .then((res) => checkResponse(res))
}
