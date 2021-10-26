import React, { Component } from "react";
import classes from "./GameParticipants.module.css";
import axios from "axios";
import Loader from "../../components/UI/Loader/Loader.js";

export default class GameParticipants extends Component {
  state = {
    users: [],
    enemies: [],
    isSecondConnected: false,
  };

  showParticipants = async () => {
    if (localStorage.getItem("EnemyID")) {
      this.setState({ isSecondConnected: true });
      console.log("we got enomy ID");
    }
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
    console.log(localStorage.getItem("EnemyID"));
    if (this.setState.users == null) {
      console.log("NULLLL");
    } else {
      console.log("NOT NULL");
    }
    //this.setState({ isSecondConnected: true });
    //  this.showParticipants();

    console.log("ENEMY", this.state.enemies);
    console.log("state", this.state);
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
            <Loader />
          </div>
        </div>
      );
    } else if (this.state.isSecondConnected) {
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
