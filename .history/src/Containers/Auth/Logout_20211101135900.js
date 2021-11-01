import { useEffect, React } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/action/auth";

const Logout = (props) => {
  useEffect(() => {
    props.logout();
    console.log("logout done");
    // eslint-disable-next-line
  }, []);
  return <Redirect to={"/auth"} />;
};

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

export default connect(null, mapDispatchToProps)(Logout);
