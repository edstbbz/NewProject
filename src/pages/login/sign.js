import React from "react";
import AuthModel from "./authModel";
import signStore from "../../store/sign";
import { observer } from "mobx-react";
import "./login.module.scss";

@observer
export default class extends React.Component {
  render() {
    return <AuthModel store={signStore} name={"Sign Up"} />;
  }
}
