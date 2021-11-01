import is from "is_js";

export function createControl(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    tuoched: false,
    value: " ",
  };
}

export function validate(value, validation = null) {
  if (!validation) {
    return true;
  }

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (validation.email) {
    isValid = is.email(value) && isValid;
  }
  if (validation.age) {
    isValid = is.number(value) && isValid;
  }
  if (validation.minLenght) {
    isValid = value.length >= validation.minLenght && isValid;
  }

  return isValid;
}

export function validateForm(formControls) {
  let isFormValid = true;

  for (let control in formControls) {
    if (formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid;
    }
  }

  return isFormValid;
}
