import { Component, React } from "react";
import classes from "./NewPassword.module.css";
import Button from "../../components/UI/Button/Button.js";
import Input from "../../components/UI/Input/Input.js";
import is from "is_js";

const NewPassord = () => {
  state = {
    isFormValid: false,
    formControls: {
      password: {
        value: "",
        type: "password",
        label: "Password",
        errorMessage: "Длинна пароля не иожет быть менее 6 символов",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  const newPasswordHeandler = (event) => {
    event.preventDefault();
    let token = this.props.match.params.token;
    console.log(token);
    const { password } = this.state.formControls;

    let data = {
      token: token,
      password: password.value,
    };

    console.log(data);

    fetch("/auth//newPassword", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    document.location.href = "/auth";

    console.log("reset");
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
          onChange={(event) => this.onChangeHandler(event, controlName)}
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

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls,
      isFormValid,
    });
  };

  return (
    <div className={classes.NewPassword}>
      <h1>Восстановление пароля</h1>
      <form onSubmit={this.submitHeadler} className={classes.NewPasswordForm}>
        {this.renderInputs()}
        <Button
          type="success"
          onClick={this.newPasswordHeandler}
          disabled={!this.state.isFormValid}
        >
          Сохранить новый пароль
        </Button>
      </form>
    </div>
  );
};
