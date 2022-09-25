import { useState, useEffect } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';

import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import * as MainApi from "../../utils/MainApi";
import {getMovies} from "../../utils/MoviesApi";
import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);

  const fetchMovies = () => {
    getMovies()
      .then(res => {
        setMovies(res);
        localStorage.setItem('movies', JSON.stringify(res));
      })
      .catch(err => {
        console.log('fetchMovies err ==> ', err);
      })
  }

  useEffect(() => {
    const cashedMovies = localStorage.getItem('movies');
    if (cashedMovies) {
      try {
        setMovies(JSON.parse(cashedMovies))
      } catch (err) {
        localStorage.removeItem('movies')
        fetchMovies();
      }
    } else {
      fetchMovies();
    }
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header/>
        <Switch>
          <Route exact path="/">
            <Main/>
          </Route>

          <ProtectedRoute
            path="/movies"
            component={Movies}
            loggedIn={isLoggedIn}
          />

          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={isLoggedIn}
          />

          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={isLoggedIn}
          />

          <Route path="/signin">
            {(isLoggedIn) ? <Redirect to="/"/> :
              <Login
              />
            }
          </Route>

          <Route path="/signup">
            {(isLoggedIn) ? <Redirect to="/"/> :
              <Register
              />
            }
          </Route>

          <Route path="*">
            <PageNotFound/>
          </Route>
        </Switch>
        <Footer/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
