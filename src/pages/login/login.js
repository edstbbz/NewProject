import React from "react";
import PropTypes from "prop-types";
import AuthModel from "./authModel";
import { inject, observer } from "mobx-react";
import "./login.module.scss";
import { NavLink, Redirect } from "react-router-dom";
import { routesMap } from "../../router/routes";
import { messages } from "../../constants";
import ErrorMessage from "../../components/errorMessage/errorMessage";

@inject('store')
@observer
export default class extends React.Component {
  static propTypes = {
    name: PropTypes.string,
  };

  render() {
    const store = this.props.store.AuthStore
    if (store.isAuth === true) {
     return <Redirect to={routesMap.home}></Redirect>
    }
    return (
      <React.Fragment>
        <AuthModel
          valid={store.isValidforLogIn}
          filter={1}
          name={!store.isDisabled ? "Log In" : "Sending..."}
          onClick={store.loginHandler}
          auth={
            <span style={{ fontStyle: "italic", color: "grey" }}>
              New User?&nbsp;&nbsp;
              <NavLink
                to={routesMap.signup}
                style={{
                  textDecoration: "none",
                  color: this.props.store.CreateTestBase.color,
                  fontWeight: "bold",
                  fontStyle: "normal",
                }}
              >
                SIGN UP
              </NavLink>
            </span>
          }
        />
        {store.isMessage === 'INVALID_EMAIL' ? (
          <ErrorMessage>{messages.name_not_found}</ErrorMessage>
        ) : null}
        {store.isMessage === "INVALID_PASSWORD" ? (
          <ErrorMessage>{messages.invalid_password}</ErrorMessage>
        ) : null}
      </React.Fragment>
    );
  }
}
