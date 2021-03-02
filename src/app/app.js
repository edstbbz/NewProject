import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import "./app.module.scss";
import Header from "../components/header/header.js";
import { routes } from "../router/routes";

class App extends React.Component {
  render() {
    let routesItems = routes.map((route) => {
      return (
        <Route
          history={history}
          key={route.path}
          path={route.path}
          render={route.RENDER}
          component={route.component}
          exact={route.exact}
        />
      );
    });
    return (
      <React.Fragment>
        <Header />
        <section className="app">
          <Switch>{routesItems}</Switch>
        </section>
        <footer className='layout_footer'>
          <div className="app_footer">
            <span className="copy">&copy; MathSimulator</span>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default withRouter(App)