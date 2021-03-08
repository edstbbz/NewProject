import React from "react";
import "./radio.module.scss";

const RadioButton = (props) => {
  return (
    <React.Fragment>
      <div className='radio_field'>
        <input
          className="radio_btn"
          onChange={props.onChange}
          type="radio"
          name="radio"
          defaultChecked={props.check}
        ></input>
        <span>{props.children}</span>
      </div>
    </React.Fragment>
  );
};

export default RadioButton;
