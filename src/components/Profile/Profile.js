import React from 'react';
import {Link} from "react-router-dom";

import './Profile.css';

function Profile() {
  return (
    <main className="profile">
      <h2 className="profile__greeting">
        Привет, Виталий!
      </h2>
      <form id="profile" className="profile__form">
        <div className="profile__form-input-container">
          <label className="profile__form-input-label">
            Имя
          </label>
          <input className="profile__form-input"
                 defaultValue="Виталий"
                 required/>
        </div>
        <div className="profile__form-input-container">
          <label className="profile__form-input-label">
            E&#8209;mail
          </label>
          <input className="profile__form-input"
                 defaultValue="pochta@yandex.ru"
                 required/>
        </div>
      </form>
      <div className="profile__controls">
        <button className="button profile__form-submit-button"
                type="submit"
                form="profile">
          Редактировать
        </button>
        <Link className="link profile__sign-out-link"
              to="/">
          Выйти из аккаунта
        </Link>
      </div>

    </main>);
}

export default Profile;
