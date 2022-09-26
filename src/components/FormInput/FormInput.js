import React from 'react';

import './FormInput.css';

function FormInput({
                     inputLabel, inputName, inputType, inputDefaultValue, inputAutocomplete, inputError, onChange, value
                   }) {
  return (
    <div className="form-input">
    <label className="form-input__label">{inputLabel}</label>
    <input name={inputName}
           className={`form-input__input ${(inputError) ? "form-input__input_type_error" : ""}`}
           defaultValue={inputDefaultValue}
           value={value}
           type={inputType}
           autoComplete={inputAutocomplete}
           onChange={onChange}
           required/>
    <p className="form-input__error-field">{inputError}</p>
  </div>);
}

export default FormInput;
