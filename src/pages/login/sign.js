import React from "react";
import AuthModel from "../../forms/authModel";
import { inject, observer } from "mobx-react";
import "./login.module.scss";

@inject('store')
@observer
export default class extends React.Component {
  render() {
    const store = this.props.store.AuthStore
    if (store.isAuth === true) {
      return <Redirect to={routesMap.home}></Redirect>
     }
    return (
     <React.Fragment>
       <AuthModel valid={store.isValidforSignUp} name={!store.isDisabled ? "Sign Up" : "Sending..."} onClick={store.authHandler} />
     </React.Fragment> 
    )
  }
}
