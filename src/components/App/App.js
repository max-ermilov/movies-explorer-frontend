import {useState, useEffect} from 'react';
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
import InfoTooltip from "../infoTooltip/InfoTooltip";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import * as api from "../../utils/MainApi";
import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({name: '', email: ''});
  const [formMessage, setFormMessage] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSaveMovieButtonDisabled, setIsSaveMovieButtonDisabled] = useState(false);
  const [isDeleteMovieButtonDisabled, setIsDeleteMovieButtonDisabled] = useState(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState('');

  const history = useHistory();
  const pathname = useLocation();

  const resetFormMessage = () => {
    setFormMessage({});
  }

  const handleApiError = (intro, err) => {
    return err.json().then(parsedError => {
      setFormMessage({
        message: `${intro}: ${parsedError.message}`
      })
    })
  }
  const handleLogin = (data) => {
    setFormMessage({
      message: 'Авторизация...'
    });
    setIsSubmitButtonDisabled(true);
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
        handleApiError('Ошибка авторизации', err)
      })
      .finally(() => setIsSubmitButtonDisabled(false))
  }

  const handleRegister = (user) => {
    setFormMessage({
      message: 'Регистрация...'
    });
    setIsSubmitButtonDisabled(true);
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
      .catch((err) => {
        handleApiError('Ошибка регистрации', err)
        setIsSubmitButtonDisabled(false)
      })
      .finally(() => setIsSubmitButtonDisabled(false))
  };

  const handleEditProfile = (user) => {
    setFormMessage({});
    setIsSubmitButtonDisabled(true)
    api.patchUser(user)
      .then((newUser) => {
        setCurrentUser(newUser);
        setFormMessage({
          message: 'Профиль обновлён'
        });
      })
      .catch((err) => {
        checkApiError(err);
        handleApiError('Ошибка обновления профиля', err);
      })
      .finally(() => setIsSubmitButtonDisabled(false));
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt', 'checkBox', 'filmSearch', 'filteredMovies');
    localStorage.removeItem('checkBox');
    localStorage.removeItem('filmSearch');
    localStorage.removeItem('filteredMovies');
    localStorage.removeItem('allMovies');
    setCurrentUser({});
    setSavedMovies([]);
    history.push('/');
  }

  const deleteMovieCard = movie => {
    setIsDeleteMovieButtonDisabled(true)
    api.deleteMovie(movie._id)
      .then((res) => {
        setSavedMovies((state) => state.filter((c) => c._id !== movie._id))
      })
      .catch((err) => {
        checkApiError(err);
        handlePopup(err.message);
      })
      .finally(() => setIsDeleteMovieButtonDisabled(false))
  };

  const saveMovieCard = movie => {
    setIsSaveMovieButtonDisabled(true)
    api.postMovie(movie)
      .then((res) => {
        setSavedMovies([res, ...savedMovies]);
      })
      .catch((err) => {
        checkApiError(err);
        handlePopup(err.message);
      })
      .finally(() => setIsSaveMovieButtonDisabled(false))
  };

  const closePopup = () => {
    setIsInfoTooltipOpen(false);
    setInfoTooltipMessage('')
  };

  const handlePopup = (error) => {
    setInfoTooltipMessage(error)
    setIsInfoTooltipOpen(true);

  }

  function checkApiError(error) {
    console.log('error ==> ', error);
    if (error.status === 401) {
      return handleLogout();
    }
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      api.getMovie()
        .then((res) => {
          setSavedMovies(res.filter((i) => i.owner._id === currentUser._id))
        })
        .catch((err) => {
          checkApiError(err)
          handlePopup(err.message)
        })
    }
  }, [currentUser])

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api.getUserCredentials()
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            history.push(pathname);
          }
        })
        .catch(() => {
          handleLogout();
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
        .catch((err) => {
          handleLogout();
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    resetFormMessage()
  }, [pathname]);

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
            // setSavedMovies={setSavedMovies}
            saveMovies={saveMovieCard}
            savedMovies={savedMovies}
            deleteMovieCard={deleteMovieCard}
            // handlePopup={handlePopup}
            isSaveMovieButtonDisabled={isSaveMovieButtonDisabled}
          />

          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={isLoggedIn}
            savedMovies={savedMovies}
            deleteMovieCard={deleteMovieCard}
            isDeleteMovieButtonDisabled={isDeleteMovieButtonDisabled}
          />

          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={isLoggedIn}
            onEditProfile={handleEditProfile}
            formMessage={formMessage}
            resetFormMessage={resetFormMessage}
            onLogout={handleLogout}
            isSubmitButtonDisabled={isSubmitButtonDisabled}

          />

          <Route path="/signin">
            {(isLoggedIn) ? <Redirect to="/"/> :
              <Login onLogin={handleLogin}
                     formMessage={formMessage}
                     resetFormMessage={resetFormMessage}
                     isSubmitButtonDisabled={isSubmitButtonDisabled}
              />
            }
          </Route>

          <Route path="/signup">
            {(isLoggedIn) ? <Redirect to="/"/> :
              <Register onRegister={handleRegister}
                        formMessage={formMessage}
                        resetFormMessage={resetFormMessage}
                        isSubmitButtonDisabled={isSubmitButtonDisabled}
              />
            }
          </Route>

          <Route path="*">
            <PageNotFound/>
          </Route>
        </Switch>
        <Footer/>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closePopup}
          status={infoTooltipMessage || "Неизвестная ошибка"}
        />
      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
