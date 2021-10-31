import React, { Component } from "react";
import classes from "./Links.module.css";
import Button from "../Button/Button";

export default class Links extends Component {
  state = {
    links: [],
  };

  refreshGameList = async () => {
    try {
      await fetch("/createGame")
        .then((res) => res.json())
        .then((links) => this.setState({ links }));
    } catch (e) {
      console.log(e);
    }
  };

  joinGame = (event) => {
    let string = {
      cliced: +1,
      id: event.target.id,
    };

    fetch("/createGame/cliced", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(string),
    }).then(console.log("cliced"));
    this.refreshGameList();
  };

  deleteGame = async (event) => {
    try {
      const aToDelete =
        event.target.previousElementSibling.previousElementSibling;
      let data = {
        id: aToDelete.id,
      };
      await fetch("/createGame/delete/", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.refreshGameList}>
          Обновить список игр
        </Button>
        <hr />
        {this.state.links.map((link) => (
          <ul className={classes.li} key={link._id}>
            <li ref={this.linkRef}>
              <a
                href={link.url}
                className={classes.a}
                onClick={this.joinGame}
                id={link._id}
              >
                {"играть против:  " + link.creator}
              </a>

              <span className={classes.span}>
                {" "}
                игроков:[ {link.cliced} из 2]
              </span>

              <Button
                className={classes.button}
                type="error"
                id={link._id}
                onClick={this.deleteGame}
              >
                &times;
              </Button>
            </li>
          </ul>
        ))}
      </div>
    );
  }
}
