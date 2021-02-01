import React from "react";
import { NavLink } from "react-router-dom";
import { routesMap } from "../../router/routes";
import "./header.module.scss";

export default class extends React.Component {

  render() {
    return (
      <header>
        <div className="header">
          <h1 className="header_title">MathSimulator</h1>
          <ul className="header_nav">
            <li>
              <NavLink exact to={routesMap.home} className="header_nav-item">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={routesMap.simulator} className="header_nav-item">
                Simulator
              </NavLink>
            </li>
            <li>
              <NavLink to={routesMap.login} className="header_nav-item">
                Sign up&nbsp;/&nbsp;Log in
              </NavLink>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}
