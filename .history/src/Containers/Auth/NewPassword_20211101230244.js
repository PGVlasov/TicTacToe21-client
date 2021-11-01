import { useState, React } from "react";
import { useParams } from "react-router-dom";
import classes from "./NewPassword.module.css";
import Button from "../../components/UI/Button/Button.js";
import Input from "../../components/UI/Input/Input.js";
import is from "is_js";

const NewPassord1 = () => {
  const [isFormValid, setFormValid] = useState(false);
  const [
    formControls = {
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

  const params = useParams();

  const newPasswordHeandler = (event) => {
    event.preventDefault();
    let token = params.token;
    console.log(token);
    const { password } = formControls;

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

  return (
    <div className={classes.NewPassword}>
      <h1>Восстановление пароля</h1>
      <form
        onSubmit={(event) => submitHeadler(event)}
        className={classes.NewPasswordForm}
      >
        {renderInputs()}
        <Button
          type="success"
          onClick={(event) => newPasswordHeandler(event)}
          disabled={!isFormValid}
        >
          Сохранить новый пароль
        </Button>
      </form>
    </div>
  );
};

export default NewPassord1;
