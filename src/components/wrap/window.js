import React from "react";
import "./window.module.scss";

const WindowBoard = (props) => {
  return (
    <React.Fragment>
      <div className="window">
        <div className="window_footer"></div>
        <div className="window_container">
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default WindowBoard;
