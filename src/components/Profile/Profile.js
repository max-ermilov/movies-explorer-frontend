import {useContext, useEffect, useState} from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Profile.css';
import {useFormValidation} from "../../utils/formValidation";
import {EMAIL_REGEX} from "../../utils/constants";

function Profile({onEditProfile, formMessage: {message}, onLogout, isSubmitButtonDisabled}) {
  const currentUser = useContext(CurrentUserContext);
  const {values, handleChange, errors, isValid, resetForm} = useFormValidation();
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisabled(true);
    onEditProfile(values)
  }

  useEffect(() => {
    setIsDisabled(!isValid || isSubmitButtonDisabled)
  }, [isValid, isSubmitButtonDisabled])

  useEffect(() => {
    const equals = values.name === currentUser.name && values.email === currentUser.email;
    if (!equals && isValid) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [values])

  useEffect(() => {
    resetForm(currentUser, {}, false);
  }, [currentUser]);

  return (
    <main className="profile">
      <h2 className="profile__greeting">
        Привет, {currentUser.name}!
      </h2>
      <form id="profile" className="profile__form" onSubmit={handleSubmit} noValidate>
        <div className="profile__form-input-container">
          <label className="profile__form-input-label">
            Имя
          </label>
          <input className={`profile__form-input ${(errors.name) ? "profile__form-input_type_error" : ""}`}
                 name="name"
                 autoComplete="disabled"
                 onChange={handleChange}
                 value={values.name || ''}
                 type="text"
                 minLength="3"
                 maxLength="30"
                 required/>
        </div>
        <span className="profile__form-input-error">{errors.name}</span>
        <div className="profile__form-input-container">
          <label className="profile__form-input-label">
            E&#8209;mail
          </label>
          <input className={`profile__form-input ${(errors.email) ? "profile__form-input_type_error" : ""}`}
                 name="email"
                 autoComplete="false"
                 onChange={handleChange}
                 value={values.email || ''}
                 type="email"
                 pattern={EMAIL_REGEX}
                 required
          />
        </div>
        <span className="profile__form-input-error">{errors.email}</span>
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
        <button className="button profile__sign-out-link"
                type="button"
                onClick={onLogout}
        >
          Выйти из аккаунта
        </button>
      </div>

    </main>);
}

export default Profile;
