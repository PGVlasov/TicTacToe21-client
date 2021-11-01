import { useState, React } from "react";
import classes from "./Reset.module.css";
import Button from "../../components/UI/Button/Button.js";
import Input from "../../components/UI/Input/Input.js";
import is from "is_js";

const Reset1 = () => {
  const [isFormValid, setFormValid] = useState(false);
  const [
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Введите корректный email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
    },
    setformControls,
  ] = useState();
  state = {
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Введите корректный email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
    },
  };

  const resetHeandler = (event) => {
    event.preventDefault();
    const { email } = this.state.formControls;
    let data = {
      email: email.value,
    };

    fetch("/auth//reset", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    document.location = "/auth";
  };

  const submitHeadler = (event) => {
    event.preventDefault();
  };

  const renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => onChangeHandler(event, controlName)}
        />
      );
    });
  };

  const validateControl = (value, validation) => {
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
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  };

  const onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    setFormValid(false);

    this.setState({
      formControls,
    });
  };

  return (
    <div className={classes.Reset}>
      <h1>Восстановление пароля</h1>
      <form onSubmit={() => submitHeadler()} className={classes.ResetForm}>
        {() => renderInputs()}
        <Button
          type="error"
          onClick={() => resetHeandler()}
          disabled={!isFormValid}
        >
          Сбросить пароль
        </Button>
      </form>
    </div>
  );
};

export default Reset1;
