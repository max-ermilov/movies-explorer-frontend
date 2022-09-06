import React from 'react';

import './Register.css';
import FormInput from "../FormInput/FormInput";
import Form from "../Form/Form";

function Register() {
  return (
    <main className="register">
      <Form formGreetings="Добро пожаловать!"
            formSubmitButtonLabel="Зарегистрироваться"
            formFooterText="Уже зарегистрированы?"
            formFooterLinkName="Войти"
            formFooterLinkTo="/signin"
      >
        <FormInput inputLabel="Имя"
                   inputType="text"
                   inputDefaultValue="Виталий"
                   inputAutocomplete="username"
                   inputError=""
        />
        <FormInput inputLabel="E-mail"
                   inputType="email"
                   inputDefaultValue="pochta@yandex.ru"
                   inputAutocomplete="email"
                   inputError=""
        />
        <FormInput inputLabel="Пароль"
                   inputType="password"
                   inputDefaultValue="Виталий"
                   inputAutocomplete="new-password"
                   inputError="Что-то пошло не так..."
        />
      </Form>
    </main>);
}

export default Register;
