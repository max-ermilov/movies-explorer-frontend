import React from 'react';
import {Route} from 'react-router-dom';

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
                   href="https://code.s3.yandex.net/homework/12693514/937a9cf4-b360-4057-a505-6c12c7e50b98/Diploma_generated.fig_1656435275.zip"
                   target="_blank"
                   rel="noreferrer">
                  Макет
                </a>
              </li>
              <li>
                <a className="link footer__link"
                   href="https://github.com/max-ermilov/movies-explorer-frontend"
                   target="_blank"
                   rel="noreferrer">
                  Github
                </a>
              </li>
              <li>
                <a className="link footer__link"
                   href="https://t.me/yermish"
                   target="_blank" rel="noreferrer">
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </Route>);
}

export default Footer;
