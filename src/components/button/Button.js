import React from "react";
import "./Button.module.scss";

const Button = (props) => {
  const classes = ["Button", [props.type]];
  return (
    <button
      style={props.style}
      onClick={props.onClick}
      className={`${classes.join(" ")} ${props.className}`}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
