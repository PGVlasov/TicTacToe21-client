import { useState, React } from "react";
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button.js";
import Input from "../../components/UI/Input/Input.js";
import is from "is_js";
import { connect } from "react-redux";
import { auth } from "../../store/action/auth";
import { Redirect } from "react-router";

const Auth = () => {
  const [isFormValid, setFormValid] = useState(false);
  const [
    formControls = {
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
      setformControls,
    },
  ] = useState();

  //     isAuthentificated: false,
  //   };

  const loginHeandler = (event) => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value
    );
  };

  const registerHeandler = () => {
    window.location.href = "/register";
  };

  const resetHeandler = () => {
    document.location = "/reset";
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

  const onChangeHandler = (event, controlName) => {
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

  if (this.props.isAuthenticated) {
    return <Redirect to={"/player"} />;
  }

  return (
    <div className={classes.Auth}>
      <h1>Авторизация</h1>
      <form onSubmit={this.submitHeadler} className={classes.AuthForm}>
        {this.renderInputs()}
        <Button
          type="success"
          onClick={this.loginHeandler}
          disabled={!this.state.isFormValid}
        >
          Войти
        </Button>
        <Button type="primary" onClick={this.registerHeandler}>
          Зарегестрироваться
        </Button>
        <Button type="error" onClick={this.resetHeandler}>
          Забыли пароль?
        </Button>
      </form>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    isAuthentificated: !!state.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password) => dispatch(auth(email, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
