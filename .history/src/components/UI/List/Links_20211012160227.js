import React, { Component, useRef } from "react";
import classes from "./Links.module.css";
import Button from "../Button/Button";

export default class Links extends Component {
  state = {
    links: [],
    linkLength: 0,
  };

  refreshGameList = (state) => {
    fetch("/createGame")
      .then((res) => res.json())
      .then(console.log("got something"))
      .then((links) => this.setState({ links }))
      .then((links) => console.log({ links }));
  };

  testValueFunction = () => {
    console.log("ATTENTION", this.linkRef.current.href);
  };

  joinGame = () => {
    this.linkRef = React.createRef();
    console.log("CLICED");
    let string = {
      cliced: +1,
      id: this.linkRef.current.href,
    };

    fetch("/createGame/cliced", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(string),
    }).then(console.log("cliced"));
  };

  deleteGame = () => {
    let string = {
      url: "this.link.url",
    };
    console.log("URLLLLLLLLLL", "this.link.url");
    fetch("/createGame/delete/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(string),
    }).then(console.log("delited"));

    this.refreshGameList();
  };

  render() {
    console.log(this.state.links);
    console.log(this.linkRef.current);
    return (
      <div>
        <Button type="primary" onClick={this.refreshGameList}>
          Обновить список игр
        </Button>
        <hr />
        {this.state.links.map((link) => (
          <div className={classes.li} key={Math.random()}>
            <a
              href={link.url}
              className={classes.a}
              onClick={this.joinGame}
              // onClick={this.testValueFunction}
              ref={this.linkRef}
            >
              {"играть против:  " + link.creator}
            </a>

            <span className={classes.span}>
              игроков {this.state.linkLength} из 2
            </span>

            <Button
              className={classes.button}
              type="error"
              onClick={this.testValueFunction}
            >
              &times;
            </Button>
          </div>
        ))}
      </div>
    );
  }
}
