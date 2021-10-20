import React, { Component } from "react";
import classes from "./Rating.module.css";
import Button from "../../components/UI/Button/Button";

export default class Rating extends Component {
  state = {
    users: [],
  };

  refreshRating = async () => {
    try {
      fetch("/users/rating")
        // .then((res) => res.json())
        .then(console.log("we got rating"))
        .then((res) => res.json())
        .then((users) => this.setState({ users }));
    } catch (e) {
      console.log(e);
    }
    console.log("Rating");
  };

  componentDidMount() {
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
        <Button type="primary" onClick={this.refreshRating}>
          Обновить Рейтинг
        </Button>
        <hr />
        <p>Здесь будет Рейтинг, а пока просто список :)</p>
        {this.state.users.map((user) => (
          <div key={user.id} className={classes.ul}>
            <img
              className={classes.avatar}
              src={user.avatarUrl}
              alt={"Аватара нет"}
            ></img>
            <p>
              <strong>{user.name}</strong>
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
