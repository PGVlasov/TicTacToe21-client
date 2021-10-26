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
      .post("/users/users", {
        userId: localStorage.getItem("localID"),
      })

      .then((res) => {
        if (res.data) {
          this.setState({ users: res.data });
        }
      });
  }

  render() {
    console.log("enemys", this.state.users);
    return (
      <div className={classes.GameParticipants}>
        {this.state.users.map((user) => (
          <div key={Math.random()}>
            <img
              className={classes.avatar}
              src={"images\2021-10-14T19-33-24.235Z-1632995409343.jpg"}
              alt={"Аватара нет"}
            ></img>
            <p className={classes.p}>
              <strong>{user.name}</strong>
            </p>
            <p className={classes.p}>
              <strong>{user.adress}</strong>
            </p>
          </div>
        ))}
        {/* <img
          className={classes.avatar}
          src={this.avatarUrl}
          alt={"Аватара нет"}
        ></img>
        <p className={classes.p}>
          <strong>Peter</strong>
        </p>{" "} */}
        <p className={classes.vs}>VS</p>
        <img
          className={classes.avatar}
          src={this.avatarUrl}
          alt={"Аватара нет"}
        ></img>
        <p className={classes.p}>
          <strong>Peter</strong>
        </p>
      </div>
    );
  }
}
