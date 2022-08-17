import React from 'react';
// import { Route, Switch, useHistory } from 'react-router-dom';

import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="container portfolio__container">
        <h2 className="portfolio__header">Портфолио</h2>
        <ul className="portfolio__links">
          <li className="portfolio__links-item">
            <a className="link portfolio__link"
               target="_blank"
               rel="noreferrer"
               href="https://github.com/max-ermilov/how-to-learn">
              Статичный сайт<span className="portfolio__link-arrow">↗</span>
            </a>
          </li>
          <li className="portfolio__links-item">
            <a className="link portfolio__link"
               target="_blank"
               rel="noreferrer"
               href="https://github.com/max-ermilov/russian-travel">
              Адаптивный сайт<span className="portfolio__link-arrow">↗</span>
            </a>
          </li>
          <li className="portfolio__links-item">
            <a className="link portfolio__link"
               target="_blank"
               rel="noreferrer"
               href="https://github.com/max-ermilov/react-mesto-api-full">
              Одностраничное приложение<span className="portfolio__link-arrow">↗</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
