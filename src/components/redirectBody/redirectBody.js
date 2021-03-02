import React from "react";
import Button from "../button/Button";
import './redirect.module.scss'

const RedirectTo = (props) => {
  return (
    <div className='redirect_body' style={props.style}>
      <h4>{props.children}</h4>
      <Button style={{margin: '0'}}type="primary" onClick={props.onClick}>
        {props.btnText}
      </Button>
    </div>
  );
};

export default RedirectTo;
