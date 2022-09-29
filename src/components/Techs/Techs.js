import React from 'react';

import './Techs.css';
import SectionHeader from "../SectionHeader/SectionHeader";

function Techs() {
  return (
    <section className="techs">
      <div className="container techs__container">
        <SectionHeader>Технологии</SectionHeader>
        <h3 className="techs__topic">7 технологий</h3>
        <p className="techs__description">
          На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте. </p>
        <ul className="techs__cards">
          <li className="techs__card">HTML</li>
          <li className="techs__card">CSS</li>
          <li className="techs__card">JS</li>
          <li className="techs__card">React</li>
          <li className="techs__card">Git</li>
          <li className="techs__card">Express.js</li>
          <li className="techs__card">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
