import classes from "./Header.module.css";
import React from "react";

export const Header = () => {
  return (
    <div>
      <h2 className={classes.Header}>Lets play TicTacToe</h2>
    </div>
  );
};
