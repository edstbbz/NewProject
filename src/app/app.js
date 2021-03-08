import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import "./app.module.scss";
import Header from "../components/header/header.js";
import { routes } from "../router/routes";
import { inject, observer } from "mobx-react";
import ErrorMessage from "../components/errorMessage/errorMessage";
import { messages } from "../constants";

@inject("store")
@observer
class App extends React.Component {
  componentDidMount() {
    this.props.store.AuthStore.autoLogIn()
  }
  render() {
    const store = this.props.store.AuthStore;
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
        {store.isMessage === 'INVALID_EMAIL' ? (
          <ErrorMessage>{messages.name_not_found}</ErrorMessage>
        ) : null}
        {store.isMessage === "INVALID_PASSWORD" ? (
          <ErrorMessage>{messages.invalid_password}</ErrorMessage>
        ) : null}
        {store.isMessage === "EMAIL_EXIST" ? (
          <ErrorMessage>{messages.invalid_password}</ErrorMessage>
        ) : null}
        {store.isMessage === "SESSION_OUT" ? (
          <ErrorMessage>{messages.session_out}</ErrorMessage>
        ) : null}
        {store.isMessage === "TOKEN_EXPIRED" ? (
          <ErrorMessage>{messages.session_out}</ErrorMessage>
        ) : null}

      </React.Fragment>
    );
  }
}

export default withRouter(App)