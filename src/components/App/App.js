import { useState, useEffect } from 'react';
import {Route, Switch, useHistory, Redirect, useLocation} from 'react-router-dom';

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

import * as api from "../../utils/MainApi";
import {getMovies} from "../../utils/MoviesApi";
import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({name: '', email: ''});
  // const [movies, setMovies] = useState([]);
  const [formMessage, setFormMessage] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);

  const history = useHistory();
  const pathname = useLocation();

  const resetFormMessage = () => {
    setFormMessage({});
  }

  const handleLogin = (data) => {
    // setLoginSending(true);
    setFormMessage({
      message: 'Авторизация...'
    });
    api.login(data)
      .then(res => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        history.push('/movies');
      })
      .then(() => {
        setFormMessage({});
      })
      .catch(err => {
        if (err.statusCode === 401) {
          setFormMessage({
            message: 'Неверный логин или пароль'
          });
        } else {
          setFormMessage({
            message: 'Ошибка авторизации'
          });
        }
      })
      .finally(() => {
        // setLoginSending(false);
      })
  }

  const handleRegister = (user) => {
    setFormMessage({
      message: 'Регистрация...'
    });
    api.register(user)
      .then(() => {
        handleLogin({
          email: user.email,
          password: user.password,
        });
      })
      .then(() => {
        setFormMessage({})
      })
      .catch(err => {
        if (err.statusCode === 409) {
          setFormMessage({
            message: 'Пользователь с таким email уже существует'
          });
        } else {
          setFormMessage({
            message: 'Ошибка регистрации'
          });
        }
      })
      .finally(() => {
        // setRegisterSending(true);
      })
  };

  const handleEditProfile = (user) => {
    setFormMessage({});
    api.patchUser(user)
      .then((newUser) => {
        setCurrentUser(newUser);
        setFormMessage({
          message: 'Профиль обновлён'
        });
      })
      .catch((err) => {
        if (err.statusCode === 409) {
          setFormMessage({
            message: 'Пользователь с таким email уже существует'
          });
        } else {
          setFormMessage({
            message: 'При обновлении профиля произошла ошибка'
          });
        }
      });
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    setCurrentUser({});
    history.push('/');
  }

  function deleteMovieCard(movie) {
    // setSubmitButtonDisabled(true)
    api.deleteMovie(movie._id)
      .then((res) => {
        setSavedMovies((state) => state.filter((c) => c._id !== movie._id))
      })
      .catch((err) => {
        // setToolTip(true)
      })
      // .finally(() => setSubmitButtonDisabled(false))
  }

  // const fetchMovies = () => {
  //   getMovies()
  //     .then(res => {
  //       setMovies(res);
  //       localStorage.setItem('movies', JSON.stringify(res));
  //     })
  //     .catch(err => {
  //       console.log('fetchMovies err ==> ', err);
  //     })
  // }
  useEffect(() => {
    // setIsLoading(true)
    if (localStorage.getItem('jwt')) {
      api.getMovie()
        .then((res) => {
          setSavedMovies(res.filter((i) => i.owner._id === currentUser._id))
        })
        .catch((err) => console.log(err))
        // .finally(() => { setIsLoading(false) })
    }
  }, [currentUser])

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      api.getUserCredentials()
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            history.push(pathname);
          }
        })
        .catch(() => {
          history.push("/")
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      api.getUserCredentials()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch(() => {
          console.log("unable to get userinfo on login")
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    resetFormMessage()
  }, [pathname]);

  // useEffect(() => {
  //   // if (isLoggedIn) {
  //     const cashedMovies = localStorage.getItem('movies');
  //     if (cashedMovies) {
  //       try {
  //         setMovies(JSON.parse(cashedMovies))
  //       } catch (err) {
  //         localStorage.removeItem('movies')
  //         fetchMovies();
  //       }
  //     } else {
  //       fetchMovies();
  //     }
  //
  // }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header isLoggedIn={isLoggedIn}/>
        <Switch>
          <Route exact path="/">
            <Main/>
          </Route>

          <ProtectedRoute
            path="/movies"
            component={Movies}
            loggedIn={isLoggedIn}
            setSavedMovies={setSavedMovies}
            savedMovies={savedMovies}
            deleteMovieCard={deleteMovieCard}
            // setToolTip={setToolTip}
            // setSubmitButtonDisabled={setSubmitButtonDisabled}
            // submitButtonDisabled={submitButtonDisabled}
          />

          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={isLoggedIn}
            savedMovies={savedMovies}
            // isLoading={isLoading}
            deleteMovieCard={deleteMovieCard}
            // submitButtonDisabled={submitButtonDisabled}
          />

          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={isLoggedIn}
            onEditProfile={handleEditProfile}
            formMessage={formMessage}
            resetFormMessage={resetFormMessage}
            onLogout={handleLogout}

          />

          <Route path="/signin">
            {(isLoggedIn) ? <Redirect to="/"/> :
              <Login onLogin={handleLogin}
                     formMessage={formMessage}
                     resetFormMessage={resetFormMessage}
              />
            }
          </Route>

          <Route path="/signup">
            {(isLoggedIn) ? <Redirect to="/"/> :
              <Register onRegister={handleRegister}
                        formMessage={formMessage}
                        resetFormMessage={resetFormMessage}
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
