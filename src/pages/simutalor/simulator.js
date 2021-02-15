import React from "react";
import Wrap from './wrap';
import Base from "./base";
import Average from "./average";
import { NavLink } from "react-router-dom";
import { routesMap } from "../../router/routes";
import { observer } from "mobx-react";
import './simulator.module.scss'

@observer
export default class extends React.Component {

  render() {
    return (
      <React.Fragment>
        <div className='simulator'>
        <div className="simulator_nav">
          <h1 className="nav_title">Navigation</h1>
          <h2>(Select difficulty level)</h2>
          <ul className="simulator_navpanel">
            <li>
              <NavLink exact to={routesMap.base} className="simulator_nav-item">
                Base
              </NavLink>
            </li>
            <li>
              <NavLink to={routesMap.average} className="simulator_nav-item">
                Average
              </NavLink>
            </li>
          </ul>
        </div>
        </div>
       
        
      </React.Fragment>
    );
  }
}
