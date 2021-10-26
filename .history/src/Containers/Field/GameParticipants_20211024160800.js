import React, { Component } from "react";
import classes from "./GameParticipants.module.css";
import axios from "axios";

export default class GameParticipants extends Component {
  state = {
    users: [],
  };

  showParticipants = async () => {};

  componentDidMount(state) {
    this.setState({ loading: false });

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
    console.log("enemies", this.state.users);
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
        <p className={classes.p}>
          <strong>Peter</strong>
        </p>
      </div>
    );
  }
}
