import React from 'react';

import './Login.css';
import FormInput from "../FormInput/FormInput";
import Form from "../Form/Form";

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
                   inputName="email"
                   inputType="email"
                   inputDefaultValue="pochta@yandex.ru"
                   inputAutocomplete="username"
                   inputError=""
        />
        <FormInput inputLabel="Пароль"
                   inputName="password"
                   inputType="password"
                   inputDefaultValue="Виталий"
                   inputAutocomplete="current-password"
                   inputError=""
        />
      </Form>
    </main>);
}

export default Login;
