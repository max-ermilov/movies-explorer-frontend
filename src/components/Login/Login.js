import {useEffect} from 'react';

import './Login.css';
import FormInput from "../FormInput/FormInput";
import Form from "../Form/Form";
import {useFormValidation} from "../../utils/formValidation";
import {EMAIL_REGEXP} from "../../utils/constants";

function Login({onLogin, formMessage: {message}, isSubmitButtonDisabled}) {
  const {values, handleChange, resetForm, errors, isValid} = useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  }

  useEffect(() => {
    resetForm({}, {}, false);
  }, [resetForm]);

  return (
    <main className="login">
      <Form formGreetings="Рады видеть!"
            formSubmitButtonLabel="Войти"
            formFooterText="Ещё не зарегистрированы?"
            formFooterLinkName="Регистрация"
            formFooterLinkTo="/signup"
            formMessage={message || ''}
            onSubmit={handleSubmit}
            isDisabled={Boolean(!isValid || isSubmitButtonDisabled)}
      >
        <FormInput inputLabel="E-mail"
                   inputName="email"
                   inputType="email"
                   inputAutocomplete="email"
                   inputError={errors.email || ''}
                   onChange={handleChange}
                   value={values.email || ''}
                   pattern={EMAIL_REGEXP}
        />
        <FormInput inputLabel="Пароль"
                   inputName="password"
                   inputType="password"
                   inputAutocomplete="current-password"
                   inputError={errors.password || ''}
                   onChange={handleChange}
                   value={values.password || ''}
                   minLength="3"
        />
      </Form>
    </main>);
}

export default Login;
