import React, { useEffect, useState } from "react";
import classes from "./GameParticipants.module.css";
import { connect } from "react-redux";
import Button from "../../components/UI/Button/Button.js";
import axios from "axios";
import Loader from "../../components/UI/Loader/Loader.js";

const GameParticipants1 = () => {
  const [users, setUsers] = useState([]);
  const [enemies, setEnemies] = useState([]);

  const refreshGame = () => {
    document.location.reload();
  };

  useEffect(() => {
    axios
      .post("/users/gameparticipants", {
        userId: localStorage.getItem("localID"),
      })

      .then((res) => {
        if (res.data) {
          setUsers([...users]);
        }
      });

    axios
      .post("/users/gameparticipants", {
        userId: localStorage.getItem("EnemyID"),
      })

      .then((res) => {
        if (res.data) {
          setEnemies([...enemies]);
        }
      });
  }, []);
  let length;
  console.log("LENGTH", length);
  if (localStorage.getItem("EnemyID") === null) {
    length = 1;
    console.log("LENGTH", length);
    console.log("ENEMY", localStorage.getItem("EnemyID"));
  } else {
    length = 2;
    console.log("LENGTH", length);
    console.log("ENEMY", localStorage.getItem("EnemyID"));
  }

  if (length < 2) {
    return (
      <div className={classes.GameParticipants}>
        {users.map((user) => (
          <div key={user._id}>
            <img
              className={classes.avatar}
              src={"/" + user.avatarUrl}
              alt={"Аватара нет"}
            ></img>
            <p className={classes.p}>
              <strong>{user.name}</strong>
            </p>
          </div>
        ))}
        <p className={classes.vs}>VS</p>
        <Button type="success" onClick={() => refreshGame()}>
          проверить готовность противника
        </Button>
        <div>
          <Loader />
        </div>
      </div>
    );
  }
  return (
    <div className={classes.GameParticipants}>
      {users.map((user) => (
        <div key={user._id}>
          <img
            className={classes.avatar}
            src={"/" + user.avatarUrl}
            alt={"Аватара нет"}
          ></img>
          <p className={classes.p}>
            <strong>{user.name}</strong>
          </p>
        </div>
      ))}
      <p className={classes.vs}>VS</p>

      {enemies.map((enemy) => (
        <div key={enemy._id}>
          <img
            className={classes.avatar}
            src={"/" + enemy.avatarUrl}
            alt={"Аватара нет"}
          ></img>
          <p className={classes.p}>
            <strong>{enemy.name}</strong>
          </p>
        </div>
      ))}
    </div>
  );
};

export default connect()(GameParticipants1);
