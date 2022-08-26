import React from 'react';
import { Route } from 'react-router-dom';

import './Footer.css';

function Footer() {
  return (
    <Route path="/(|movies|saved-movies)">
    <footer className="footer">
      <div className="footer__container">
        <h2 className="footer__header">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>
        <div className="footer__wrap">
          <p className="footer__copyright">
            &copy;&nbsp;{new Date().getFullYear()}
          </p>
          <ul className="footer__links">
            <li>
              <a className="link footer__link"
                 href="https://praktikum.yandex.ru"
                 target="_blank"
                 rel="noreferrer">
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a className="link footer__link"
                 href="https://github.com/max-ermilov"
                 target="_blank"
                 rel="noreferrer">
                Github
              </a>
            </li>
            <li>
              <a className="link footer__link"
                 href="https://www.facebook.com"
                 target="_blank" rel="noreferrer">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
    </Route>);
}

export default Footer;
