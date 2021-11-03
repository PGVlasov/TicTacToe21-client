import React, { useState, useEffect } from "react";
import Button from "../../components/UI/Button/Button.js";
import Input from "../../components/UI/Input/Input.js";
import classes from "./Player.module.css";
import Uploader from "../../components/UI/Uploader/Uploader.js";
import axios from "axios";
import { connect } from "react-redux";
import is from "is_js";

let range;

const Player = () => {
  const [users, setUsers] = useState([]);
  const [player, setPlayer] = useState([]);
  const [isFormValid, setFormValid] = useState(false);
  const [editButtomClicked, setEditButtomClicked] = useState(false);
  const [
    formControls = {
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
    setformControls,
  ] = useState();

  const editUser = (event) => {
    event.preventDefault();
    setEditButtomClicked(true);
  };

  const canсelEditUser = (event) => {
    event.preventDefault();
    const plr = player.concat();
    setEditButtomClicked(false);
    setFormValid(false);
    setformControls(formControls);
    setPlayer(plr);
    document.location.reload();
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const showRange = () => {
    let range = 0;
    return range;
  };
  const saveUser = (event) => {
    event.preventDefault();
    const plr = player.concat();
    const index = plr.length + 1;

    const { name, age, adress } = formControls;

    let playerItem = {
      name: name.value,
      id: index,
      age: age.value,
      adress: adress.value,
    };

    plr.push(playerItem);

    let data = {
      name: name.value,
      age: age.value,
      adress: adress.value,
      userId: localStorage.getItem("localID"),
    };

    fetch("/editUsers", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setEditButtomClicked(false);
    setFormValid(false);
    setformControls(formControls);
    setPlayer(plr);
    document.location.reload();
  };

  const deleteUser = (event) => {
    event.preventDefault();
    console.log(localStorage.getItem("localID"));
    let data = {
      id: localStorage.getItem("localID"),
    };
    fetch("/users/delete/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    document.location.href = "/auth";
    localStorage.removeItem("token");
    localStorage.removeItem("localID");
    localStorage.removeItem("expirationDate");
  };
  useEffect(() => {
    axios
      .post("/users/users", {
        userId: localStorage.getItem("localID"),
      })

      .then((res) => {
        if (res.data) {
          setUsers(res.data);
        }
      });
  }, []);

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

  if (editButtomClicked) {
    return (
      <div className={classes.Player}>
        <h1>Профиль</h1>
        <div>
          <div className={classes.PlayerForm}>
            <Uploader />
            {users.map((user) => (
              <div key={user._id} className={classes.playerInfo}>
                <p>
                  Email: <strong>{user.email}</strong>
                </p>
                <p>
                  Имя: <strong>{user.name}</strong>
                </p>
                <p>
                  Ваш возраст: <strong>{user.age}</strong>
                </p>
                <p>
                  Город: <strong>{user.adress}</strong>
                </p>
              </div>
            ))}
            <hr />
            <div className={classes.editPlayer}>
              <form onSubmit={(event) => submitHandler(event)}></form>
              <div>
                <form disabled={!editButtomClicked}>
                  <Button
                    type="primary"
                    onClick={(event) => canсelEditUser(event)}
                  >
                    Закрыть без изменений
                  </Button>
                  {renderInputs()}
                  <Button
                    type="success"
                    onClick={(event) => saveUser(event)}
                    disabled={!isFormValid}
                  >
                    Сохранить изменения информации
                  </Button>
                  <hr />
                  <p className={classes.delete}>Опасная зона</p>
                  <Button type="error" onClick={(event) => deleteUser(event)}>
                    Удалить Аккаунт
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.Player}>
        <h1>Профиль</h1>
        <div className={classes.PlayerPhoto}>
          {users.map((user) => (
            <div key={user._id}>
              <img
                className={classes.avatar}
                src={user.avatarUrl}
                alt={"Аватара нет"}
              ></img>
            </div>
          ))}
        </div>

        <div className={classes.PlayerForm}>
          <h3>Игрок</h3>
          <p>Рейтинг (количество побед): {showRange(range)}</p>
          {users.map((user) => (
            <div key={user._id} className={classes.playerInfo}>
              <p>
                Email: <strong>{user.email}</strong>
              </p>
              <p>
                Имя: <strong>{user.name}</strong>
              </p>
              <p>
                Возраст: <strong>{user.age}</strong>
              </p>
              <p>
                Город: <strong>{user.adress}</strong>
              </p>
            </div>
          ))}
          <hr />
          <div className={classes.editPlayer}>
            <form onSubmit={(event) => submitHandler(event)}>
              <Button type="primary" onClick={(event) => editUser(event)}>
                Редактировать профиль
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default connect()(Player);
