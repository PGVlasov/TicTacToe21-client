import { useEffect, React } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Game from "./Containers/Field/Game";
import { Header } from "./Containers/Header/Header";
import Navbar from "./Containers/Navbar/Navbar";
import About from "./Containers/Field/About";
import Player from "./Containers/Field/Player";
import Auth from "./Containers/Auth/Auth";
import Register from "./Containers/Auth/Register";
import Reset from "./Containers/Auth/Reset";
import Training from "./Containers/Training/Training";
import Logout from "./Containers/Auth/Logout";
import GameList from "./Containers/Field/GameList";
import NewPassord from "./Containers/Auth/NewPassword";
import { connect } from "react-redux";
import { autoLogin } from "./store/action/auth";

// class App extends Component {
//   componentDidMount() {
//     this.props.autoLogin();
//   }
//   render() {
//     if (this.props.isAuthenticated) {
//       return (
//         <Switch>
//           <BrowserRouter>
//             <Header />
//             <Navbar />
//             <Route path="/gameList" exact component={GameList} />
//             <Route path="/game/:id" component={Game} />
//             <Route path="/training" component={Training} />
//             <Route path="/player" component={Player} />
//             <Route path="/register" component={Register} />
//             <Route path="/reset" component={Reset} />
//             <Route path="/newPassword/:token" component={NewPassord} />
//             <Route path="/" exact component={About} />
//             <Route path="/logout" component={Logout} />
//           </BrowserRouter>
//         </Switch>
//       );
//     } else {
//       return (
//         <Switch>
//           <BrowserRouter>
//             <Header />
//             <Navbar />
//             <Route path="/training" component={Training} />
//             <Route path="/register" component={Register} />
//             <Route path="/reset" component={Reset} />
//             <Route path="/newPassword/:token" component={NewPassord} />
//             <Route path="/auth" component={Auth} />
//             <Route path="/" exact component={About} />
//           </BrowserRouter>
//         </Switch>
//       );
//     }
//   }
// }

// function mapStateToProps(state) {
//   return {
//     isAuthenticated: !!state.token,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     autoLogin: () => dispatch(autoLogin()),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);

const App = (props) => {
  // componentDidMount() {
  //   this.props.autoLogin();
  // }

  useEffect(() => {
    props.autoLogin();
  }, []);

  if (props.isAuthenticated) {
    return (
      <Switch>
        <BrowserRouter>
          <Header />
          <Navbar />
          <Route path="/gameList" exact component={GameList} />
          <Route path="/game/:id" component={Game} />
          <Route path="/training" component={Training} />
          <Route path="/player" component={Player} />
          <Route path="/register" component={Register} />
          <Route path="/reset" component={Reset} />
          <Route path="/newPassword/:token" component={NewPassord} />
          <Route path="/" exact component={About} />
          <Route path="/logout" component={Logout} />
        </BrowserRouter>
      </Switch>
    );
  } else {
    return (
      <Switch>
        <BrowserRouter>
          <Header />
          <Navbar />
          <Route path="/training" component={Training} />
          <Route path="/register" component={Register} />
          <Route path="/reset" component={Reset} />
          <Route path="/newPassword/:token" component={NewPassord} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={About} />
        </BrowserRouter>
      </Switch>
    );
  }
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
