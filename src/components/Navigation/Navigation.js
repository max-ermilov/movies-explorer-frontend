import React from 'react';
import {NavLink, Link} from 'react-router-dom';

import './Navigation.css';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  }

  return (
    <nav className="navigation">
      <div className="navigation__menu">
        <NavLink className="link navigation__link"
                 activeClassName="navigation__link_active"
                 to="/movies">
          Фильмы
        </NavLink>
        <NavLink className="link navigation__link"
                 activeClassName="navigation__link_active"
                 to="/saved-movies">
          Сохранённые фильмы
        </NavLink>
        <Link className="link navigation__user-profile-link"
              to="/profile">
          Аккаунт
        </Link>
        <button className="button navigation__button"
                onClick={handleMenuOpen}
                type="button"
                aria-label="Открыть меню"/>
      </div>
      <div className={`navigation__burger-menu burger-menu ${isMenuOpen ? "burger-menu_is-open" : ""}`}>
        <div className="burger-menu__links">
          <button className="button burger-menu__close-button"
                  onClick={handleMenuClose}
                  type="button"
                  aria-label="Закрыть меню"/>
          <NavLink className="link burger-menu__link"
                   activeClassName="burger-menu__link_active"
                   exact to="/"
                   onClick={handleMenuClose}>
            Главная
          </NavLink>
          <NavLink className="link burger-menu__link"
                   activeClassName="burger-menu__link_active"
                   to="/movies"
                   onClick={handleMenuClose}>
            Фильмы
          </NavLink>
          <NavLink className="link burger-menu__link"
                   activeClassName="burger-menu__link_active"
                   to="/saved-movies"
                   onClick={handleMenuClose}>
            Сохранённые фильмы
          </NavLink>
          <Link className="link burger-menu__user-profile-link"
                to="/profile" onClick={handleMenuClose}>
            Аккаунт
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
