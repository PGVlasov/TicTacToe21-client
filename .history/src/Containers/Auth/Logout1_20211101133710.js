import { useEffect, React } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/action/auth";

const Logout = () => {
  useEffect(() => {
    this.props.logout();
    console.log("logout done");
  }, []);
  //   componentDidMount() {
  //     this.props.logout();
  //     console.log("logout done");
  //   }

  return <Redirect to={"/auth"} />;
};

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

export default connect(null, mapDispatchToProps)(Logout);
