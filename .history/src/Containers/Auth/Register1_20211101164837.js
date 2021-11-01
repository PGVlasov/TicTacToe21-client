import { Component, React } from "react";
import classes from "./Register.module.css";
import Button from "../../components/UI/Button/Button.js";
import Input from "../../components/UI/Input/Input.js";
import is from "is_js";

const Register = ()=> {
  state = {
    isFormValid: false,
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
      name: {
        value: "",
        type: "text",
        label: "Name",
        errorMessage: "Длинна не иожет быть менее 2 символов",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 2,
        },
      },
      age: {
        value: "",
        type: "number",
        label: "Age",
        errorMessage: "введите число",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 1,
        },
      },
      adress: {
        value: "",
        type: "text",
        label: "Adress",
        errorMessage: "Длинна не иожет быть менее 2 символов",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 2,
        },
      },
    },
  };

  registerHeandler = (event) => {
    event.preventDefault();
    const { email, password, name, age, adress } = this.state.formControls;
    let data = {
      email: email.value,
      password: password.value,
      name: name.value,
      age: age.value,
      adress: adress.value,
    };

    console.log(data);

    fetch("/addUser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    document.location.href = "/auth";

    console.log(email.value);
  };

  submitHeadler = (event) => {
    event.preventDefault();
  };

  renderInputs() {
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
  }

  validateControl(value, validation) {
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
  }

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

  render() {
    return (
      <div className={classes.Register}>
        <h1>Регистрация</h1>
        <form onSubmit={this.submitHeadler} className={classes.RegisterForm}>
          {this.renderInputs()}
          <Button
            type="success"
            onClick={this.registerHeandler}
            disabled={!this.state.isFormValid}
          >
            Зарегестрироваться
          </Button>
        </form>
      </div>
    );
  }
}

export default Register
