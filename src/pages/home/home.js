import React from "react";
import { Link } from "react-router-dom";
import { routesMap } from "../../router/routes";
import Slider from "../../components/slider/slider";
import WindowBoard from "../../components/wrap/window";
import "./home.module.scss";
import Button from "../../components/button/Button";
export default class extends React.Component {

  render() {
    return (
      <div className="home_container">
        <div className="home_wrap">
          <WindowBoard classWindow="home_height">
            <div className="start_info">
              <h1>Hello, this is a math simulator! </h1>
              <h2>Here you can practice your skills in:</h2>
              <ul>
                <li>1. multiplication table</li>
                <li>2. frations</li>
                <li>3. equations</li>
                <li>&nbsp;..and more</li>
              </ul>
            </div>
            <div className="go_task">
              <h2>Go to task!</h2>
              <Link to={routesMap.simulator} className="btn_complete">
                <Button type="primary">Simulator</Button>
              </Link>
            </div>
          </WindowBoard>
        </div>
        <div className="home_wrap">
          <WindowBoard classWindow="home_height" classWinDow='second'>
            <h1 className="slider_info">Math is interesting!</h1>
            <Slider />
          </WindowBoard>
        </div>
      </div>
    );
  }
}
