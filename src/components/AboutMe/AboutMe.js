import React from 'react';
// import { Route, Switch, useHistory } from 'react-router-dom';

import './AboutMe.css';
import SectionHeader from "../SectionHeader/SectionHeader";
import studentPhoto from "../../images/about-me.jpeg";

const STUDENTS_BIRTHDAY = "1986-06-26"
const age = (birthday) => {
  const birthdate = new Date(birthday);
  const today = new Date();
  return Math.floor((today - birthdate) / 31557600000); // Divide by 1000*60*60*24*365.25
}

function AboutMe() {
  return (
    <section className="about-me">
      <div className="container about-me__container">
        <SectionHeader>Студент</SectionHeader>
        <div className="about-me__cover">
          <div className="about-me__info">
            <h3 className="about-me__info-name">Максим</h3>
            <h4 className="about-me__summary">Фронтенд-разработчик, {age(STUDENTS_BIRTHDAY)}&nbsp;лет</h4>
            <p className="about-me__description">
              Я&nbsp;родился и&nbsp;живу в&nbsp;Нижнем Новгороде, работал в&nbsp;техподдержке сотрудников Сбербанка.
              Люблю делать разные штуки руками. Недавно решил сменить профессию и&nbsp;заняться разработкой.
            </p>
            <ul className="about-me__social-medias">
              <li>
                <a className="link about-me__social-media-link"
                   target="_blank"
                   rel="noreferrer"
                   href="https://www.facebook.com">Facebook</a>
              </li>
              <li>
                <a className="link about-me__social-media-link"
                   target="_blank"
                   rel="noreferrer"
                   href="https://github.com/max-ermilov">Github</a>
              </li>
            </ul>
          </div>
          <img className="about-me__photo"
          src={studentPhoto}
          alt="фото студента"/>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
