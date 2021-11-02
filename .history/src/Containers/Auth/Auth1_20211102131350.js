import { useState, React } from "react";
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button.js";
import Input from "../../components/UI/Input/Input.js";
import is from "is_js";
import { connect } from "react-redux";
import { auth } from "../../store/action/auth";
import { Redirect } from "react-router";

const Auth1 = (props) => {
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
    },
    setformControls,
  ] = useState();

  const loginHeandler = () => {
    console.log("cliced");
    this.props.auth(formControls.email.value, formControls.password.value);
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
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
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
    const fControls = { ...formControls };
    const control = { ...fControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    fControls[controlName] = control;

    let isFormValid = true;

    Object.keys(fControls).forEach((name) => {
      isFormValid = fControls[name].valid && isFormValid;
    });

    setFormValid(isFormValid);
    setformControls(fControls);
  };

  //   if (this.props.isAuthenticated) {
  //     return <Redirect to={"/player"} />;
  //   }

  return (
    <div className={classes.Auth}>
      <h1>Авторизация</h1>
      <form
        onSubmit={(event) => submitHeadler(event)}
        className={classes.AuthForm}
      >
        {renderInputs()}
        <Button
          type="success"
          onClick={(event) => loginHeandler(event)}
          disabled={!isFormValid}
        >
          Войти
        </Button>
        <Button type="primary" onClick={(event) => registerHeandler(event)}>
          Зарегестрироваться
        </Button>
        <Button type="error" onClick={(event) => resetHeandler()}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Auth1);
