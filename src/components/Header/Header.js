import React from 'react';
import {Link, Route, useLocation} from 'react-router-dom';

import './Header.css';
import Navigation from "../Navigation/Navigation"
import logo from '../../images/logo.svg'

function Header({isLoggedIn}) {
  let location = useLocation().pathname;

  return (<Route path="/(|movies|saved-movies|profile)">
    <header className={`header ${(location !== "/") ? "" : "header_type_landing"}`}>
      <div className="header__container">
        <Link className="link header__logo-link" to="/">
          <img className="header__logo" src={logo} alt="Логотип сайта"/>
        </Link>
        {(!isLoggedIn) ?
          <div className="header__auth-links">
            <Link
              to="/signup"
              className="link header__signup-link"
            >
              Регистрация
            </Link>
            <Link
              to="/signin"
              className="link header__signin-link"
            >
              Войти
            </Link>
          </div>
          :
          <Navigation/>}
      </div>
    </header>
  </Route>);
}

export default Header;
