import React from "react";
import "regenerator-runtime/runtime.js";
import ReactDom from "react-dom";
import AuthStore from "./store/AuthStore";
import BaseMath from "./store/baseMath";
import CreateTestBase from "./store/createTest";
import "normalize.css";
import App from "~/app/app.js";
import { Provider } from "mobx-react";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from 'history';

const store = {
  AuthStore,
  BaseMath,
  CreateTestBase,
};

const history = createBrowserHistory();

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDom.render(
  app,

  document.querySelector("#root")
);
