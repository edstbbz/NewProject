import React from "react";
import { NavLink } from "react-router-dom";
import { routesMap } from "../../router/routes";
import "./header.module.scss";

export default class extends React.Component {
  state = {
    blackTheme: false,
    stroke: "black",
    fill: "yellow",
  };

  changeThemeHandler() {
    let body = document.querySelector("body");
    let a = document.getElementsByTagName("a");
    if (this.state.blackTheme) {
      body.style = "";
      for (let item of a) {
        item.style.color = "black";
      }
      this.setState({ stroke: "black", fill: "yellow" });
    } else {
      body.style.backgroundColor = "black";
      body.style.color = "#f3f3f3";
      for (let item of a) {
        item.style.color = "#f3f3f3";
      }
      this.setState({ stroke: "#f3f3f3", fill: "" });
    }
    this.setState({ blackTheme: !this.state.blackTheme });
  }

  render() {
    this.linkRef = [];
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
              <NavLink to={routesMap.signup} className="header_nav-item">
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink to={routesMap.login} className="header_nav-item">
                Log In
              </NavLink>
            </li>
          </ul>
          <div className="theme_li">
              <button
                className="theme_btn"
                onClick={() => this.changeThemeHandler()}
              >
                <svg
                  viewBox="0 0 24 24"
                  style={{ width: "24px", height: "24px" }}
                >
                  <path
                    fill={this.state.fill}
                    stroke={this.state.stroke}
                    strokeWidth="2"
                    d="M12,17.5 C15.0375661,17.5 17.5,15.0375661 17.5,12 C17.5,8.96243388 15.0375661,6.5 12,6.5 C8.96243388,6.5 6.5,8.96243388 6.5,12 C6.5,15.0375661 8.96243388,17.5 12,17.5 Z M12,6.5 L12,1 M12,23 L12,17.5 M1,12 L6.5,12 M17.5,12 L23,12 M4.4375,4.4375 L8.5625,8.5625 M15.4375,15.4375 L19.5625,19.5625 M19.5625,4.4375 L15.4375,8.5625 M8.5625,15.4375 L4.4375,19.5625"
                  ></path>
                </svg>
              </button>
            </div>
        </div>
      </header>
    );
  }
}
