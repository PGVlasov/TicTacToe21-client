import React, { Component, useRef } from "react";
import classes from "./Links.module.css";
import Button from "../Button/Button";
//import * as ws from "../../Containers/Field/websocket.js";
import * as ws from "../../../Containers/Field/websocket";

export default class Links extends Component {
  state = {
    links: [],
    linkLength: 0,
  };

  refreshGameList = () => {
    try {
      fetch("/createGame")
        .then((res) => res.json())
        .then((links) => this.setState({ links }));
    } catch (e) {
      console.log(e);
    }
  };

  testValueFunction = (link) => {
    console.log(this.link);
  };

  joinGame = (event) => {
    console.log("CLICED", event.target.id);
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

    ws.send("READYTOPLAY", {
      myIdToEmomy: localStorage.getItem("localID"),
    });

    this.refreshGameList();
  };

  deleteGame = (event) => {
    const aToDelete =
      event.target.previousElementSibling.previousElementSibling;
    let data = {
      id: aToDelete.id,
    };
    fetch("/createGame/delete/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // this.refreshGameList();
  };

  render() {
    // try {
    //   setInterval(() => {
    //     this.refreshGameList();
    //   }, 5000);
    // } catch (e) {}

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
                // elementTiming={link.cliced} // вот это место очень непонятное, я просто не знал какой property использовать у тега <a> для передачи NUMBER и использовал elementTiming
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
