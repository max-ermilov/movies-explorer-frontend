import React from 'react';

import './Form.css';
import logo from "../../images/logo.svg";
import {Link} from "react-router-dom";

function Form({
                children,
                formGreetings,
                formMessage,
                formSubmitButtonLabel,
                formFooterText,
                formFooterLinkName,
                formFooterLinkTo,
                onSubmit,
                isDisabled,
                // isSubmitButtonDisabled
              }) {
  return (
    <div className="form">
      <Link className="link form__logo-link" to="/">
        <img className="form__logo" src={logo} alt="Логотип сайта"/>
      </Link>
      <h2 className="form__greetings">{formGreetings}</h2>
      <form className="form__form" onSubmit={onSubmit} noValidate>
        {children}
        <div className="form__footer">
          <p className="form__message">{formMessage}</p>
          <button className="button form__submit-button"
                  type="submit"
                  disabled={isDisabled}
          >
            {formSubmitButtonLabel}
          </button>
          <p className="form__footer-text">
            {formFooterText}&nbsp;
            <Link className="link form__footer-link"
                  to={formFooterLinkTo}>
              {formFooterLinkName}
            </Link>
          </p>
        </div>
      </form>
    </div>);
}

export default Form;
