import React, { Component } from "react";
import classes from "./GameParticipants.module.css";
import Button from "../../components/UI/Button/Button";

export default class GameParticipants extends Component {
  state = {
    users: [],
  };

  refreshRating = async () => {
    // try {
    //   fetch("/users/rating")
    //     .then(console.log("we got rating"))
    //     .then((res) => res.json())
    //     .then((users) => this.setState({ users }));
    // } catch (e) {
    //   console.log(e);
    // }
    // console.log("Rating");
  };

  render() {
    return (
      <div className={classes.GameParticipants}>
        {/* {this.state.users.map((user) => (
          <div key={Math.random()} className={classes.ul}>
            <img
              className={classes.avatar}
              src={user.avatarUrl}
              alt={"Аватара нет"}
            ></img>
            <p className={classes.p}>
              <strong>{user.name}</strong>
            </p>
          </div>
        ))} */}
        <img
          className={classes.avatar}
          src={this.avatarUrl}
          alt={"Аватара нет"}
        ></img>
        <p className={classes.p}>
          <strong>Peter</strong>
        </p>

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
