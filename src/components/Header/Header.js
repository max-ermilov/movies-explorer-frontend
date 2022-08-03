import React from 'react';
// import { Route, Switch, useHistory } from 'react-router-dom';
import { Link, Route, useLocation } from 'react-router-dom';

import './Header.css';
import logo from '../../images/logo.svg'

function Header() {
  let location = useLocation().pathname;

  return (
    <header className={`header ${(location !== "/") ? "" : "header_type_landing"}`}>
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Логотип сайта"/>
        </Link>
        <p>some text</p>
      </div>
    </header>
  );
}

export default Header;
