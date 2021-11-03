import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./navbar.module.css";
import { connect } from "react-redux";

const Navbar1 = (props) => {
  if (props.isAuthenticated) {
    return (
      <nav className={classes.navbar}>
        <div className={classes.navbarHeader}>MENU</div>
        <ul className={classes.ul}>
          <li className={classes.li}>
            <NavLink exact to="/" className={classes.NavLink}>
              Info
            </NavLink>
          </li>
          <li className={classes.li}>
            <NavLink exact to="/gameList" className={classes.NavLink}>
              Lobby
            </NavLink>
          </li>
          <li className={classes.li}>
            <NavLink to="/training" className={classes.NavLink}>
              Training
            </NavLink>
          </li>
          <li className={classes.li}>
            <NavLink to="/player" className={classes.NavLink}>
              Player
            </NavLink>
          </li>
          <li className={classes.li}>
            <NavLink to="/logout" className={classes.NavLink}>
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className={classes.navbar}>
        <div className={classes.navbarHeader}>MENU</div>
        <ul className={classes.ul}>
          <li className={classes.li}>
            <NavLink to="/" className={classes.NavLink}>
              Info
            </NavLink>
          </li>
          <li className={classes.li}>
            <NavLink to="/training" className={classes.NavLink}>
              Training
            </NavLink>
          </li>
          <li className={classes.li}>
            <NavLink to="/auth" className={classes.NavLink}>
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.token,
  };
}

export default connect(mapStateToProps)(Navbar1);
