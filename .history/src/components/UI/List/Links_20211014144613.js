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

  testValueFunction = (event) => {
    //this.linkRef = React.createRef();
  };

  joinGame = (event) => {
    console.log("CLICED", event.target.id);
    let string = {
      cliced: Number(event.target.elementTiming) + 1,
      id: event.target.id,
    };

    alert(event.target.elementTiming);

    fetch("/createGame/cliced", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(string),
    }).then(console.log("cliced"));
  };

  deleteGame = (event) => {
    const aToDelete =
      event.target.previousElementSibling.previousElementSibling;
    const aToDeleteID = aToDelete.id;
    console.log(aToDeleteID);
    let data = {
      id: aToDelete.id,
    };
    fetch("/createGame/delete/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(console.log("delited"));

    //this.refreshGameList();
  };

  render() {
    setInterval(() => {
      this.refreshGameList();
    }, 5000);
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
                elementTiming={link.cliced} // вот это место очень тонкое, я просто не знал какой property использовать у тега <a> для передачи NUMBER и использовал elementTiming
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
