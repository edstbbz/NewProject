import React from "react";
import Wrap from './wrap'
import "./wrap.module.scss";

export default class extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="wrap_footer"></div>
          <div className="wrap_container">
              <Wrap/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
