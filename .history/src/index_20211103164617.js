import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, compose, applyMiddleware } from "redux";
import authReducer from "././store/reducers/auth";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import reduxThunk from "redux-thunk";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const logerMidleware = (store) => (next) => (action) => {
  const result = next(action);
  return result;
};

const store = createStore(
  authReducer,
  composeEnhancers(applyMiddleware(logerMidleware, reduxThunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
