import {useEffect} from 'react';

import './Register.css';
import FormInput from "../FormInput/FormInput";
import Form from "../Form/Form";
import {useFormValidation} from "../../utils/formValidation";

function Register({onRegister, formMessage: {message}, isSubmitButtonDisabled}) {
  const {values, handleChange, resetForm, errors, isValid} = useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  }

  useEffect(() => {
    resetForm({}, {}, false);
  }, [resetForm]);

  return (
    <main className="register">
      <Form formGreetings="Добро пожаловать!"
            formSubmitButtonLabel="Зарегистрироваться"
            formFooterText="Уже зарегистрированы?"
            formFooterLinkName="Войти"
            formFooterLinkTo="/signin"
            formMessage={message || ''}
            onSubmit={handleSubmit}
            isDisabled={!isValid || isSubmitButtonDisabled}
      >
        <FormInput inputLabel="Имя"
                   inputName="name"
                   inputType="text"
                   inputAutocomplete="name"
                   inputError={errors.name || ''}
                   onChange={handleChange}
                   value={values.name || ''}
        />
        <FormInput inputLabel="E-mail"
                   inputName="email"
                   inputType="email"
                   inputAutocomplete="email"
                   inputError={errors.email || ''}
                   onChange={handleChange}
                   value={values.email || ''}
        />
        <FormInput inputLabel="Пароль"
                   inputName="password"
                   inputType="password"
                   inputAutocomplete="new-password"
                   inputError={errors.password || ''}
                   onChange={handleChange}
                   value={values.password || ''}
        />
      </Form>
    </main>);
}

export default Register;
