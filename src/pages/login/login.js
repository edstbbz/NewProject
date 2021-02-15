import React from "react";
import PropTypes from "prop-types";
import logStore from "../../store/log";
import AuthModel from "./authModel";
import { observer } from "mobx-react";
import "./login.module.scss";

@observer
export default class extends React.Component {
  static propTypes = {
    store: PropTypes.object,
    name: PropTypes.string,
  };

  render() {
    return <AuthModel store={logStore} name={"Log In"} />;
  }
}
