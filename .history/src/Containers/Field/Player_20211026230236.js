import React, { Component } from "react";
import Button from "../../components/UI/Button/Button.js";
import Input from "../../components/UI/Input/Input.js";
import classes from "./Player.module.css";
import Auxillary from "../../hoc/Auxillary/Auxillary.js";
//import Select from "../../components/UI/Select/Select.js";
import Loader from "../../components/UI/Loader/Loader.js";
import Uploader from "../../components/UI/Uploader/Uploader.js";
import axios from "axios";
import {
  createControl,
  validate,
  validateForm,
} from "../../form/formFramework";
//import photo from "../../images/photo.jpeg";
import { number } from "is_js";
import { connect } from "react-redux";

let range;

function createFormControls() {
  return {
    name: createControl(
      {
        label: "Введите имя",
        errorMessage: "Имя не может быть пустым",
      },
      { required: true }
    ),
    age: createControl(
      {
        label: "Введите возраст",
        type: number,
        errorMessage: "Возраст не может быть пустым",
        validation: { age: true },
      },
      { required: true }
      //   {
      //     validation: {
      //       required: true,
      //       age: true,
      //     },
      //   }
    ),
    adress: createControl(
      {
        label: "Введите адрес",
        errorMessage: "Адрес не может быть пустым",
      },
      { required: true }
    ),
  };
}

class Players extends Component {
  state = {
    users: [], // server test
    USERSSSS: [],
    player: [],
    gender: "",
    editButtomClicked: false,
    isFormValid: false,
    formControls: createFormControls(),
    loading: true,
  };

  editUser = (event) => {
    event.preventDefault();
    console.log("you can edit your profile");
    this.setState({
      editButtomClicked: true,
    });
  };

  canсelEditUser = (event) => {
    event.preventDefault();
    const player = this.state.player.concat();
    this.setState({
      player,
      isFormValid: false,
      formControls: createFormControls(),
      editButtomClicked: false,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  //   addAvatar = (event) => {
  //     event.preventDefault();
  //     let photo;
  //     fetch("/avatar", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify(photo),
  //     }).then(console.log("avatar added"));
  //   };

  showRange = () => {
    let range = 2;
    return range;
  };
  saveUser = (event) => {
    event.preventDefault();
    const player = this.state.player.concat();
    const index = player.length + 1;

    const { name, age, adress } = this.state.formControls;

    let playerItem = {
      name: name.value,
      id: index,
      age: age.value,
      adress: adress.value,
    };

    player.push(playerItem);
    console.log(player);

    let data = {
      name: name.value,
      age: age.value,
      adress: adress.value,
      userId: localStorage.getItem("localID"),
    };

    console.log(data);

    fetch("/editUsers", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(console.log("sended"));

    this.setState({
      player,
      isFormValid: false,
      formControls: createFormControls(),
      editButtomClicked: false,
    });

    console.log(this.state.imageList);
  };
  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;
    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };

  selectChangeHeandler = (event) => {
    this.setState({
      gender: event.target.value,
    });
  };

  componentDidMount(state) {
    this.setState({ loading: false });

    axios
      .post("/users/users", {
        userId: localStorage.getItem("localID"),
      })

      .then((res) => {
        if (res.data) {
          this.setState({ users: res.data });
        }
      });
  }

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Auxillary key={controlName + index}>
          <Input
            label={control.label}
            type={control.type}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            shouldValidate={!!control.validation}
            errorMessage={control.errorMessage}
            onChange={(event) =>
              this.changeHandler(event.target.value, controlName)
            }
          />
        </Auxillary>
      );
    });
  }

  render() {
    if (this.state.editButtomClicked) {
      return (
        <div className={classes.Player}>
          <h1>Профиль</h1>
          <div>
            <div className={classes.PlayerForm}>
              <Uploader />
              {this.state.users.map((user) => (
                <div key={user.id}>
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
                    Пол: <strong>{user.sex}</strong>
                  </p>
                  <p>
                    Город: <strong>{user.adress}</strong>
                  </p>
                </div>
              ))}
              <hr />
              <div className={classes.editPlayer}>
                <form onSubmit={this.submitHandler}></form>
                <div>
                  <form disabled={!this.state.editButtomClicked}>
                    <Button type="primary" onClick={this.canсelEditUser}>
                      Закрыть без изменений
                    </Button>
                    {this.renderControls()}
                    <Button
                      type="success"
                      onClick={this.saveUser}
                      disabled={!this.state.isFormValid}
                    >
                      Сохранить изменения информации
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
            {this.state.users.map((user) => (
              <div key={user.id}>
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
            <p>Рейтинг (количество побед): {this.showRange(range)}</p>
            {this.state.loading ? (
              <Loader />
            ) : (
              this.state.users.map((user) => (
                <div key={user.id}>
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
                    Пол: <strong>{user.sex}</strong>
                  </p>
                  <p>
                    Город: <strong>{user.adress}</strong>
                  </p>
                </div>
              ))
            )}
            <hr />
            <div className={classes.editPlayer}>
              <form onSubmit={this.submitHandler}>
                <Button type="primary" onClick={this.editUser}>
                  Редактировать профиль
                </Button>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default connect()(Players);
