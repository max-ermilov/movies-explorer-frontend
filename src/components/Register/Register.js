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
            formMessage=""
      >
        <FormInput inputLabel="Имя"
                   inputName="username"
                   inputType="text"
                   inputDefaultValue="Виталий"
                   inputAutocomplete="username"
                   inputError=""
        />
        <FormInput inputLabel="E-mail"
                   inputName="email"
                   inputType="email"
                   inputDefaultValue="pochta@yandex.ru"
                   inputAutocomplete="email"
                   inputError=""
        />
        <FormInput inputLabel="Пароль"
                   inputName="password"
                   inputType="password"
                   inputDefaultValue="Виталий"
                   inputAutocomplete="new-password"
                   inputError="Что-то пошло не так..."
        />
      </Form>
    </main>);
}

export default Register;
