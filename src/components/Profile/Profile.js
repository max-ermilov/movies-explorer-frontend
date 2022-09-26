import {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Profile.css';
import {useFormValidation} from "../../utils/formValidation";

function Profile({onEditProfile, formMessage: {message}}) {
  const currentUser = useContext(CurrentUserContext);
  const {values, handleChange, errors, isValid, resetForm} = useFormValidation();
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisabled(true);
    onEditProfile(values)
  }

  useEffect(() => {
    setIsDisabled(!isValid)
  }, [isValid])

  useEffect(() => {
    const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    if (!equals(values, currentUser) && isValid) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
    console.log('equals ==> ', equals(values, currentUser));
  }, [values])

  useEffect(() => {
    resetForm(currentUser, {}, false);
  }, [currentUser]);

  return (
    <main className="profile">
      <h2 className="profile__greeting">
        Привет, {currentUser.name}!
      </h2>
      <form id="profile" className="profile__form" onSubmit={handleSubmit}>
        <div className="profile__form-input-container">
          <label className="profile__form-input-label">
            Имя
          </label>
          <input className="profile__form-input"
                 name="name"
                 autoComplete="disabled"
                 onChange={handleChange}
                 value={values.name || ''}
                 type="text"
                 minLength="3"
                 maxLength="30"
                 required/>
        </div>
        <div className="profile__form-input-container">
          <label className="profile__form-input-label">
            E&#8209;mail
          </label>
          <input className="profile__form-input"
                 name="email"
                 autoComplete="disabled"
                 onChange={handleChange}
                 value={values.email || ''}
                 type="email"
                 required
          />
        </div>
      </form>
      <div className="profile__controls">
        <p className="profile__message">{message || ''}</p>
        <button className="button profile__form-submit-button"
                type="submit"
                form="profile"
                disabled={isDisabled}
        >
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
