import React, { Component } from "react";
import classes from "./Rating.module.css";

export default class Rating extends Component {
  state = {
    users: [],
  };

  componentDidMount(state) {
    // try {
    //   fetch("/users/rating")
    //     .then((res) => res.json())
    //     .then(console.log("we got rating"));
    //   //   .then((res) => res.json())
    //   //   .then((links) => this.setState({ links }));
    // } catch (e) {
    //   console.log(e);
    // }
    console.log("done");
  }
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
              Количество побед: <strong>0</strong>
            </p>
          </div>
        ))}
      </div>
    );
  }
}
