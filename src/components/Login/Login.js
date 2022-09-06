import React from 'react';

import './Login.css';
import FormInput from "../FormInput/FormInput";
import Form from "../Form/Form";
import {Link} from "react-router-dom";

function Login() {
  return (
    <main className="login">
      <Form formGreetings="Рады видеть!"
            formSubmitButtonLabel="Войти"
            formFooterText="Ещё не зарегистрированы?"
            formFooterLinkName="Регистрация"
            formFooterLinkTo="/signup"
      >
        <FormInput inputLabel="E-mail"
                   inputType="email"
                   inputDefaultValue="pochta@yandex.ru"
                   inputAutocomplete="username"
                   inputError=""
        />
        <FormInput inputLabel="Пароль"
                   inputType="password"
                   inputDefaultValue="Виталий"
                   inputAutocomplete="current-password"
                   inputError=""
        />
      </Form>
    </main>);
}

export default Login;
