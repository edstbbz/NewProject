import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import "./login.module.scss";

@observer
export default class extends React.Component {
  static propTypes = {
    store: PropTypes.object,
    name: PropTypes.string.isRequired,
  };

  ls = (e) => {
    e.preventDefault();
    let names = this.props.store.userInfo.name;
    let pas = this.props.store.userInfo.password;
    localStorage.setItem("name", names);
    localStorage.setItem("pass", pas);
  }

  render() {
    let formFields = this.props.store.formData.map((field, i) => {
      return (
        <label key={field.name} className="authLabel">
            <div className='authName'>
            <p> {field.label} </p>
            <p className="errorMessage">
            {field.valid === null || field.valid ? "" : field.errorMessage}
            </p>
            </div>
          
          <input
            type="text"
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => this.props.store.change(i, e.target.value)}
          ></input>
        </label>
      );
    });

    return (
      <React.Fragment>
        <div className="loginPage">
          <form className="authForm">
            <fieldset className="fieldSet">
              <h2>{this.props.name}</h2>
              <hr />
              {formFields}
              <hr />
              <button
                type="submit"
                className="button_success"
                disabled={!this.props.store.isValid}
                onClick={this.ls}
              >
                {this.props.name}
              </button>
            </fieldset>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
