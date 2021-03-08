import React from "react";
import Button from "../button/Button";
import WindowBoard from "../wrap/window";

const AuthForm = (props) => {
  return (
    <div className='authPage_container'>
      <WindowBoard classWinDow={'authPage_window'}> 
        <form className="authForm" onSubmit={props.onSubmit}>
          <fieldset className="fieldSet">
            <h2>{props.name}</h2>
            <hr />
            {props.children}
            {props.check}
            <Button
              type="success"
              style={{ height: "3rem", width: "100%", margin: "0 0 1rem 0"}}
              disabled={props.disabled}
              onClick={props.onClick}
            >
              {props.name.toUpperCase()}
            </Button>
            {props.clientWidth < 500 ? null : <pre/>}
            {props.auth}
          </fieldset>
        </form>
    </WindowBoard>
    </div>
    
  );
};

export default AuthForm;
