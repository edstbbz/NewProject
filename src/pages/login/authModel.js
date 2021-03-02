import React from "react";
import PropTypes from "prop-types";
import AuthForm from "../../components/authForm/authForm";
import { inject, observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./login.module.scss";

@inject("store")
@observer
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.AuthStore;
  }
  static propTypes = {
    name: PropTypes.string.isRequired,
  };
  state = {
    width: null
  };
  componentDidMount() {
    this.setState({ width: document.body.clientWidth });
  }
  componentWillUnmount() {
    this.setState({ width: null });
    this.store.reset();
  }
  submitHandler = (e) => {
    e.preventDefault();
  };

  returnFormFields = () => {
    let fields = this.store.formData;
    let formFields = fields.map((field, i) => {
      return (
        <label key={field.name} className="authLabel">
          <div className="authName">
            <p className='authFieldName'> {field.label} </p>
            <p className="errorMessage">
              {field.valid === null || field.valid || field.value === ""
                ? ""
                : field.errorMessage}
            </p>
          </div>

          {field.name === "password"  ? (
            <div className="password_area">
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => this.store.change(i, e.target.value)}
              ></input>
              <FontAwesomeIcon
                className="password_eye"
                icon={this.store.showPassIcon}
                color="#9ddc5e"
                style={{ marginRight: "5px" }}
                onClick={() => {
                  this.store.showPassword();
                }}
              />
            </div>
          ) : (
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              onChange={(e) => this.store.change(i, e.target.value)}
            ></input>
          )}
        </label>
      );
    });
    if (this.props.filter == 1) {
      return formFields.filter((ele, i) => i !== this.props.filter);
    }
    return formFields;
  };

  render() {
    return (
      <AuthForm
        name={this.props.name}
        disabled={!this.props.valid || this.store.isDisabled}
        onClick={this.props.onClick}
        auth={this.props.auth}
        clientWidth={this.state.width}
        onSubmit={this.submitHandler}
      >
        {this.returnFormFields()}
      </AuthForm>
    );
  }
}
