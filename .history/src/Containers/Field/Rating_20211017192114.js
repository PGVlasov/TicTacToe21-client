import React, { Component } from "react";
import classes from "./Rating.module.css";

export default class Rating extends Component {
  render() {
    return (
      <div className={classes.Rating}>
        {this.state.users.map((user) => (
          <div key={user.id}>
            <img
              className={classes.avatar}
              src={user.avatarUrl}
              alt={"Аватара нет"}
            ></img>
            <p>
              Имя: <strong>{user.name}</strong>
            </p>
            <p>
              Имя: <strong>{user.name}</strong>
            </p>
          </div>
        ))}
      </div>
    );
  }
}
