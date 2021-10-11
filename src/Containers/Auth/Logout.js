import { Component, React } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/action/auth";

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
    console.log("logout done");
  }

  render() {
    return <Redirect to={"/auth"} />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

export default connect(null, mapDispatchToProps)(Logout);
