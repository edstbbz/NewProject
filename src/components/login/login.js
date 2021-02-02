import React from "react";
import logStore from "../../store/log";
import { observer } from "mobx-react";
import "./login.module.scss";

@observer
export default class extends React.Component {
    ls(e) {
        e.preventDefault();
        let name = logStore.userInfo.name;
        let pas = logStore.userInfo.password;
        localStorage.setItem('name', logStore.userInfo.name)
        localStorage.setItem('pass', logStore.userInfo.password)

    }
  render() {
    let formLogInFields = logStore.formData.map((field, i) => {
      return (
        <label key={field.name} className="authLabel">
          <p> {field.label} </p>
          <input
            type="text"
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => logStore.change(i, e.target.value)}
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
          <form className="authForm" onSubmit={this.ls}>
            <fieldset className="fieldSet">
              <h2>Log In</h2>
              <hr />
              {formLogInFields}
              <hr />
              <button type='submit' className="button_success" disabled={!logStore.isValid} onClick={this.ld}>Log In</button>
            </fieldset>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
