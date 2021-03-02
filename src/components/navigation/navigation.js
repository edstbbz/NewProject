import React from "react";
import { NavLink } from "react-router-dom";
import { routesMap } from "../../router/routes";
import "./navigation.module.scss";

const NavigationToggle = (props) => {
  const close = (e) => {
    e.preventDefault();

    if (props.onClose) {
      props.onClose();
    }
  };

  if (props.isOpen === false) {
    return null;
  }

  const classes = ["navigation_body"];
  if (props.isOpen === true) {
    classes.push("activenav");
  }
  if (props.dark === true) {
    classes.push("dark_nav");
  }
 
  return (
    <React.Fragment>
      <div className={classes.join(" ")}>
        <div className="navigation_content">
          <ul className="header_nav nav_modal">
            <li onClick={(e) => close(e)}>
              <NavLink
                exact
                to={routesMap.home}
                className="header_nav-item modal-item"
              >
                Home
              </NavLink>
            </li>
            <li onClick={(e) => close(e)}>
              <NavLink
                to={routesMap.simulator}
                className="header_nav-item modal-item"
              >
                Simulator
              </NavLink>
            </li>
            {props.storeIsAuth === false ? (
              <li onClick={(e) => close(e)}>
                <NavLink
                  to={routesMap.login}
                  className="header_nav-item modal-item"
                >
                  Log In
                </NavLink>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="bg bg_nav" onClick={(e) => close(e)} />
    </React.Fragment>
  );
};

export default NavigationToggle;
