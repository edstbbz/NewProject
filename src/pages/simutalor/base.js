import React from "react";
import Wrap from "./wrap";
import BaseData from "../../store/baseMath";
import Loader from "../../components/loading/loading";
import "./wrap.module.scss";
import { observer } from "mobx-react";
import WindowBoard from "../../components/wrap/window";

@observer
export default class extends React.Component {
  componentWillUnmount() {
    BaseData.Clear();
  }

  render() {
    return (
      <React.Fragment>
        {BaseData.isLoader === true ? (
          <Loader />
        ) : (
          <div className='container_test'>
            <WindowBoard>
              <Wrap />
            </WindowBoard>
          </div>
        )}
      </React.Fragment>
    );
  }
}
