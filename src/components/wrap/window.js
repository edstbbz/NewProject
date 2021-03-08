import React from "react";
import "./window.module.scss";

const WindowBoard = (props) => {
  const classes = ["window_container", [props.classWindow]];
  const classes1 = ["window", [props.classWinDow]]
  return (
    <React.Fragment>
      <div className={classes1.join(" ")} style={props.style}>
        <div className="window_footer">
          <div className="dots"><div className='dots_dot'></div></div>
        </div>
        <div className={classes.join(" ")}>{props.children}</div>
      </div>
    </React.Fragment>
  );
};

export default WindowBoard;
