import React from "react";
import "./select.module.scss";

const Select = (props) => {
  const htmlFor = `${props.label}-${Math.random()}`;

  return (
    <div className="Select">
      <label htmlFor={htmlFor}>
        <p style={props.pStyle}>{props.label}</p>
      </label>
      <select
        style={props.style}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
      >
        {props.options.map((option, index) => {
          return (
            <option value={option.value} key={option.value + index}>
              {option.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
