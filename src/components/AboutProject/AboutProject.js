import React from 'react';
// import { Route, Switch, useHistory } from 'react-router-dom';

import './AboutProject.css';
import SectionHeader from "../SectionHeader/SectionHeader";

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="container about-project__container">
        <SectionHeader>О проекте</SectionHeader>
        <div className="about-project__content">
          <article className="about-project__description">
            <h3 className="about-project__description-header">Дипломный проект включал 5&nbsp;этапов</h3>
            <p className="about-project__description-text">
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.            </p>
          </article>
          <article className="about-project__description">
            <h3 className="about-project__description-header">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__description-text">
              У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </article>
        </div>
        <div className="about-project__timeline">
          <div className="about-project__bar-wrap">
            <div className="about-project__bar about-project__bar_backend">1 неделя</div>
            <div className="about-project__caption">Back-end</div>
          </div>
          <div className="about-project__bar-wrap">
            <div className="about-project__bar about-project__bar_frontend">4 недели</div>
            <div className="about-project__caption">Front-end</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
