import React from "react";

const AuthForm = (props) => {
  console.log(props.onClick);
  return (
    <React.Fragment>
      <div className="loginPage">
        <form className="authForm">
          <fieldset className="fieldSet">
            <h2>{props.name}</h2>
            <hr />
            {props.children}
            <hr />
            <button
              type="submit"
              className="button_success"
              disabled={props.disabled}
              onClick={props.onClick}
            >
              {props.name.toUpperCase()}
            </button>
          </fieldset>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AuthForm;
