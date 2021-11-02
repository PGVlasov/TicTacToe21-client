import React, { Component } from "react";
import classes from "./GameParticipants.module.css";
import { connect } from "react-redux";
import Button from "../../components/UI/Button/Button.js";
import axios from "axios";
import Loader from "../../components/UI/Loader/Loader.js";

class GameParticipants extends Component {
  state = {
    users: [],
    enemies: [],
    isSecondConnected: false,
    isTest: false,
  };
  playersLenth = 0;

  refreshGame = () => {
    document.location.reload();
  };

  componentDidMount(state) {
    axios
      .post("/users/gameparticipants", {
        userId: localStorage.getItem("localID"),
      })

      .then((res) => {
        if (res.data) {
          this.setState({ users: res.data });
        }
      });

    axios
      .post("/users/gameparticipants", {
        userId: localStorage.getItem("EnemyID"),
      })

      .then((res) => {
        if (res.data) {
          this.setState({ enemies: res.data });
          //   this.setState({ isSecondConnected: true });
        }
      });
  }

  render() {
    let lenth = 1;
    if (localStorage.getItem("EnemyID") === null) {
      //   console.log("NULLLL");
      //   console.log("ENOMY IDDD", localStorage.getItem("EnemyID"));
      //   console.log("EN", localStorage.getItem("EnemyIDII"));
    } else {
      //   console.log("NULLLL");
      //   console.log("ENOMY IDDD", localStorage.getItem("EnemyID"));
      //   console.log("EN", localStorage.getItem("EnemyIDII"));
      //   console.log("NOT NULL");
      lenth = 2;
      // return lenth;
    }
    //this.setState({ isSecondConnected: true });
    //this.showParticipants();

    // console.log("ENEMY", this.state.enemies);
    // console.log("state", this.state);
    // console.log("lenth", lenth);
    if (lenth < 2) {
      return (
        <div className={classes.GameParticipants}>
          {this.state.users.map((user) => (
            <div key={Math.random()}>
              <img
                className={classes.avatar}
                src={"/" + user.avatarUrl}
                alt={"Аватара нет"}
              ></img>
              <p className={classes.p}>
                <strong>{user.name}</strong>
              </p>
            </div>
          ))}
          <p className={classes.vs}>VS</p>
          <Button type="success" onClick={this.refreshGame}>
            проверить готовность противника
          </Button>
          <div>
            <Loader />
          </div>
        </div>
      );
    }

    return (
      <div className={classes.GameParticipants}>
        {this.state.users.map((user) => (
          <div key={Math.random()}>
            <img
              className={classes.avatar}
              src={"/" + user.avatarUrl}
              alt={"Аватара нет"}
            ></img>
            <p className={classes.p}>
              <strong>{user.name}</strong>
            </p>
          </div>
        ))}
        <p className={classes.vs}>VS</p>

        {this.state.enemies.map((enemy) => (
          <div key={Math.random()}>
            <img
              className={classes.avatar}
              src={"/" + enemy.avatarUrl}
              alt={"Аватара нет"}
            ></img>
            <p className={classes.p}>
              <strong>{enemy.name}</strong>
            </p>
          </div>
        ))}
      </div>
    );
  }
}

export default connect()(GameParticipants);
