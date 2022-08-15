import React from 'react';
// import { Route, Switch, useHistory } from 'react-router-dom';
import {Link, Route, Switch, useLocation} from 'react-router-dom';

import './Header.css';
import Navigation from "../Navigation/Navigation"
import logo from '../../images/logo.svg'

function Header() {
  let location = useLocation().pathname;

  return (<Route path="/(|movies|saved-movies|profile)">
      <header className={`header ${(location !== "/") ? "" : "header_type_landing"}`}>
        <div className="header__container">
          <Link className="link header__logo-link" to="/">
            <img className="header__logo" src={logo} alt="Логотип сайта"/>
          </Link>
          <Switch>
            <Route exact path="/">
              <div className="header__auth-links">
                <Link
                  to="/signup"
                  className="header__signup-link"
                >
                  Регистрация
                </Link>
                <Link
                  to="/signin"
                  className="header__signin-link"
                >
                  Войти
                </Link>
              </div>
            </Route>
            <Route path="(|movies|saved-movies|profile)">
              <Navigation/>
            </Route>
          </Switch>
        </div>
      </header>
    </Route>);
}

export default Header;
