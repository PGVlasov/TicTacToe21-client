import React, { useState } from "react";
import classes from "./Rating.module.css";
import Button from "../../components/UI/Button/Button";

const Rating = () => {
  const [users, setUsers] = useState([]);

  const refreshRating = async () => {
    try {
      fetch("/users/rating")
        .then((res) => res.json())
        .then((res) => setUsers(res.data));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={classes.Rating}>
      <Button type="primary" onClick={() => refreshRating()}>
        Обновить Рейтинг
      </Button>
      <hr />
      <p>Здесь будет Рейтинг, а пока просто список :)</p>
      {users.map((user) => (
        <div key={user._id} className={classes.ul}>
          <img
            className={classes.avatar}
            src={user.avatarUrl}
            alt={"Аватара нет"}
          ></img>
          <p className={classes.p}>
            <strong>{user.name}</strong>
          </p>
          <p>
            Побед: <strong>0</strong>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Rating;
