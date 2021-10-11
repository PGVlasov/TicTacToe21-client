import { React } from "react";
import classes from "./About.module.css";

const About = () => {
  return (
    <div className={classes.container}>
      <h1 className="display-4">Information</h1>
      <p className="lead">
        project version<strong> 1.1.0</strong>{" "}
      </p>
    </div>
  );
};

export default About;
