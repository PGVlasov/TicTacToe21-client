import React, { useState } from "react";
import classes from "./Links.module.css";
import Button from "../Button/Button";

const Links1 = () => {
  const [board, setBoard] = useState();
  const [step, setStep] = useState("X");
  const [isMoveAvaible, setMoveAvaible] = useState(true);

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
            >
              {"играть против:  " + link.creator}
            </a>

            <span className={classes.span}> игроков:[ {link.cliced} из 2]</span>

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
};

export default Links1;
