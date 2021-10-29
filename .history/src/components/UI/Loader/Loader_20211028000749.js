import React from "react";
import classes from "./Loader.module.css";

const Loader = (props) => (
  <div className={classes.Loader} key={Math.random()}>
    <div />
    <div />
  </div>
);
export default Loader;
