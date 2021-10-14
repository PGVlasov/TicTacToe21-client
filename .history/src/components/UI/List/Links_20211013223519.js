import React, { Component, useRef } from "react";
import classes from "./Links.module.css";
import Button from "../Button/Button";

export default class Links extends Component {
  constructor(props) {
    super(props);
    this.linkRef = React.createRef();
  }
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
    //this.linkRef = React.createRef();
    console.log("ATTENTION", this.linkRef);
  };

  joinGame = (event) => {
    console.log("CLICED", event.target.id);
    let string = {
      cliced: +1,
      id: event.target.id,
    };

    alert(event.target.childElementCount);

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
    // console.log(this.linkRef.current);
    return (
      <div>
        <Button type="primary" onClick={this.refreshGameList}>
          Обновить список игр
        </Button>
        <hr />
        {this.state.links.map((link) => (
          <ul className={classes.li} key={Math.random()}>
            <li ref={this.linkRef}>
              <a
                href={link.url}
                className={classes.a}
                onClick={this.joinGame}
                id={link._id}
                childElementCount={link.cliced}
                // onClick={this.testValueFunction}
              >
                {"играть против:  " + link.creator}
              </a>

              <span className={classes.span}>
                игроков {this.state.linkLength} из 2
              </span>

              <Button
                className={classes.button}
                type="error"
                id={link._id}
                onClick={this.testValueFunction}
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
