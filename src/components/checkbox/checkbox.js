import React from "react";
import "./checkbox.module.scss";

const CheckBox = (props) => {
  return (
    <React.Fragment>
      <div className="checkbox">
        <i className="checkbox_text">{props.children}</i>
        <input
          className="checkbox_check"
          type="checkbox"
          name="checkbox"
          defaultChecked={props.checked}
          onChange={props.onChange}
        ></input>
        <label htmlFor='checkbox'></label>
      </div>
    </React.Fragment>
  );
};

CheckBox.defaultProps = {
  checked: false,
};

export default CheckBox;
