import React, { useState } from "react";
import classes from "./Links.module.css";
import Button from "../Button/Button";

const Links1 = () => {
  const [links, setLinks] = useState([]);

  const refreshGameList = async () => {
    try {
      await fetch("/createGame")
        .then((res) => res.json())
        .then((links) => setLinks([...links]));
    } catch (e) {
      console.log(e);
    }

    console.log(links);
  };

  const joinGame = (event) => {
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
    alert(string);
  };

  const deleteGame = async (event) => {
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
  //() => setCount(count + 1)

  return (
    <div>
      <Button type="primary" onClick={() => refreshGameList()}>
        Обновить список игр
      </Button>
      <hr />
      {links.map((link) => {
        return (
          <ul className={classes.li} key={link._id}>
            <li>
              <a
                href={link.url}
                className={classes.a}
                onClick={(event) => joinGame(event)}
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
                onClick={() => deleteGame(link)}
              >
                &times;
              </Button>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default Links1;
