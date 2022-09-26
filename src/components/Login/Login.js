import {useEffect} from 'react';

import './Login.css';
import FormInput from "../FormInput/FormInput";
import Form from "../Form/Form";
import { useFormValidation } from "../../utils/formValidation";

function Login({onLogin, formMessage:{message}, resetFormMessage}) {
  const {values, handleChange, resetForm, errors, isValid} = useFormValidation();
  // const isDisabled = !isValid
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  }

  useEffect(() => {
    resetForm({}, {}, false);
    // resetFormMessage();
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
            isDisabled={!isValid}
      >
        <FormInput inputLabel="E-mail"
                   inputName="email"
                   inputType="email"
                   // inputDefaultValue="pochta@yandex.ru"
                   inputAutocomplete="email"
                   inputError={errors.email || ''}
                   onChange={handleChange}
                   value={values.email || ''}
        />
        <FormInput inputLabel="Пароль"
                   inputName="password"
                   inputType="password"
                   // inputDefaultValue="Виталий"
                   inputAutocomplete="current-password"
                   inputError={errors.password || ''}
                   onChange={handleChange}
                   value={values.password || ''}
        />
      </Form>
    </main>);
}

export default Login;
