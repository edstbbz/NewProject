import React from "react";
import Button from "../button/Button";
import WindowBoard from "../wrap/window";

const AuthForm = (props) => {
  return (
    <div className='authPage_container'>
      <WindowBoard classWinDow={'authPage_window'}> 
        <form className="authForm">
          <fieldset className="fieldSet">
            <h2>{props.name}</h2>
            <hr />
            {props.children}
            <pre/>
            <Button
              type="success"
              style={{ height: "3rem", width: "100%", margin: "1rem 0rem"}}
              disabled={props.disabled}
              onClick={props.onClick}
            >
              {props.name.toUpperCase()}
            </Button>
          </fieldset>
        </form>
    </WindowBoard>
    </div>
    
  );
};

export default AuthForm;
