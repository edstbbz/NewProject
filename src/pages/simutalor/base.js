import React from "react";
import Wrap from "./wrap";
import Loader from "../../components/loading/loading";
import "./wrap.module.scss";
import { inject, observer } from "mobx-react";
import WindowBoard from "../../components/wrap/window";

@inject('store')
@observer
export default class extends React.Component {
  constructor(props){
    super(props)
    this.store = this.props.store.BaseMath
  }
  componentWillUnmount() {
    this.store.Clear();
  }

  render() {
    return (
      <React.Fragment>
        {this.store.isLoader === true ? (
          <Loader />
        ) : (
          <div className='container_test'>
            <WindowBoard classWinDow='test_window'>
              <Wrap />
            </WindowBoard>
          </div>
        )}
      </React.Fragment>
    );
  }
}
