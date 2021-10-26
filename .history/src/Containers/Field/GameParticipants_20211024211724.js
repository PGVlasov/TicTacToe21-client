import React, { Component } from "react";
import classes from "./GameParticipants.module.css";
import axios from "axios";

export default class GameParticipants extends Component {
  state = {
    users: [],
    enemies: [],
    isSecondConnected: false,
  };

  showParticipants = async () => {};

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
  }

  render() {
    console.log(localStorage.getItem("EnemyID"));
    if (!this.state.isSecondConnected) {
      this.showParticipants();
    }
    console.log("ENEMY", this.state.enemies);
    if (!this.state.isSecondConnected) {
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
          <div>
            <p>Ожидание противника</p>
          </div>
        </div>
      );
    } else {
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
}
