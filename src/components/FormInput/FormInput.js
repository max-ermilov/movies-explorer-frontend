import React from 'react';

import './FormInput.css';

function FormInput({ inputLabel, inputType, inputDefaultValue, inputAutocomplete, inputError }) {
  return (
    <div className="form-input">
      <label className="form-input__label">
        {inputLabel}
      </label>
      <input className={`form-input__input ${(inputError) ? "form-input__input_type_error" : ""}`}
             defaultValue={inputDefaultValue}
             type={inputType}
             autoComplete={inputAutocomplete}
             required/>
      <p className="form-input__error-field">
        {inputError}
      </p>
    </div>);
}

export default FormInput;
