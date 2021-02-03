import React from "react";
import { Link } from 'react-router-dom';
import { routesMap } from "../../router/routes";
import './home.module.scss';
export default class extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="start_info">
          <h1>Hello, this is a math simulator! </h1>
          <h2>Here you can practice your skills in:</h2>
          <ul>
            <li>multiplication table</li>
            <li>frations</li>
            <li>equations</li>
            <li>..and more</li>
          </ul>
        </div>
        <div className='go_task'>
          <h2>Go to task!</h2>
          <Link to={routesMap.simulator} className="btn_complete">
                Simulator
              </Link>
        </div>
      </React.Fragment>
    );
  }
}
