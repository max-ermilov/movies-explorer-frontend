import {MAIN_API_URL} from './constants';
import checkResponse from "./checkResponse";

export const register = ({email, password, name}) => {
  return fetch(`${MAIN_API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password, name})
  })
    .then(res => checkResponse(res));
};


export const login = ({email, password}) => {
  return fetch(`${MAIN_API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then(res => checkResponse(res));
};

export const getUserCredentials = () => {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  })
    .then(res => checkResponse(res));
};

export const patchUser = (user) => {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem("jwt")}`
    },
    body: JSON.stringify({
      name: user.name,
      email: user.email
    }),
  })
    .then(res => checkResponse(res));
}
