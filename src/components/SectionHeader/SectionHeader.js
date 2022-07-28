import React from 'react';
// import { Route, Switch, useHistory } from 'react-router-dom';

import './Promo.css';
import promoLogo from "../../images/promo-logo.svg";

function SectionHeader() {
  return (
    <section className="promo">
      <div className="promo__container">
        <img className="promo__logo" src={promoLogo}/>
        <div className="promo__content">
          <h1 className="promo__header">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <p className="promo__description">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <a className="promo__link" href="#about-project">Узнать больше</a>
        </div>
      </div>
    </section>
  );
}

export default Promo;
