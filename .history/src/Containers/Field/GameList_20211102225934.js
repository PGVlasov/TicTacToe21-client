import React, { useEffect } from "react";
import classes from "./GameList.module.css";
import Button from "../../components/UI/Button/Button.js";
import Links from "../../components/UI/List/Links.js";
import Rating from "./Rating";

let links = [];

const GameList = () => {
  const createGame = () => {
    try {
      links = {
        creator: localStorage.getItem("localID"),
        title: `http://localhost:3000/game/:${(+new Date()).toString(16)}`,
        cliced: 0,
      };

      fetch("/createGame", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        },
        body: JSON.stringify(links),
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    localStorage.removeItem("EnemyID");
    localStorage.removeItem("EnemyIDII");
  }, []);

  return (
    <div className={classes.GameList}>
      <h1>Создайте игру или присоеденитесь к существующей</h1>
      <div className={classes.Container}>
        <div className={classes.Create}>
          <Button type="success" onClick={() => createGame()}>
            Создайть игру
          </Button>
        </div>
        <div className={classes.LinksList}>
          <h3>Присоеденитесь к игре</h3>
          <hr />
          <Links links={links} />
        </div>
        <div className={classes.PlayersRange}>
          <h3>Рейтинг Игроков</h3>
          <hr></hr>
          <Rating />
        </div>
      </div>
    </div>
  );
};

export default GameList;
