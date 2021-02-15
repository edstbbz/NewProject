import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./app.module.scss";
import Header from "../components/header/header.js";
import { routes } from "../router/routes";

export default class extends React.Component {
  render() {
    let routesItems = routes.map((route) => {
      return (
        <Route
          key={route.path}
          path={route.path}
          component={route.component}
          exact={route.exact}
        />
      );
    });

    return (
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <section className="app">
            <Switch>{routesItems}</Switch>
          </section>
          <footer>
            <div className="app_footer">
              <span className="copy">&copy; MathSimulator</span>
            </div>
          </footer>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
