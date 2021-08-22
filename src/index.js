import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./Base.scss";
import 'react-lazy-load-image-component/src/effects/blur.css';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
