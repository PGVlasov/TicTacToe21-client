import React, { Component } from "react";
import classes from "./Rating.module.css";

export default class Rating extends Component {
  state = {
    users: [],
  };

  async componentDidMount(state) {
    //   //   .then(console.log("got something"))
    // .then((users) => this.setState({ users }));
    //   //   .then(function (response) {
    //   //     console.log("response", response.body);
    //   //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
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
