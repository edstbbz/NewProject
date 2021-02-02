import React from "react";
import signStore from "../../store/sign";
import { observer } from "mobx-react";
import "./login.module.scss";

@observer
export default class extends React.Component {
  render() {
    let formFields = signStore.formData.map((field, i) => {
      return (
        <label key={field.name} className="authLabel">
          <p> {field.label} </p>
          <input
            type="text"
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => signStore.change(i, e.target.value)}
          ></input>
          <p className="errorMessage">
            {field.valid === null || field.valid ? "" : field.errorMessage}
          </p>
        </label>
      );
    });

    return (
      <React.Fragment>
        <div className="loginPage">
          <form className="authForm">
            <fieldset className="fieldSet">
              <h2>Sign Up</h2>
              <hr />
              {formFields}
              <hr />
              <button type='submit' className="button_success" disabled={!signStore.isValid} onClick={console.log(signStore.name)}>Sign Up</button>
            </fieldset>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
