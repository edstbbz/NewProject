import React from "react";
import "./errorMessage.module.scss";

const ErrorMessage = (props) => {
  return (
    <div className="errorMessage_body">
      <span>[ERROR]:&nbsp;{props.children}</span>
    </div>
  );
};

export default ErrorMessage;
