import React from "react";
import PropTypes from "prop-types";
import BaseData from "../../store/baseMath";
import { observer } from "mobx-react";

@observer
export default class extends React.Component {
  static propTypes = {
    dataz: PropTypes.object,
  };

  state = {
    cnt: 0,
  };

  increase = () => {
    this.setState({ cnt: this.state.cnt + 1 });
  };

  render() {
    let data = BaseData.baseMath.map((field, i) => {
      return (
        <div key={field.name} className="simulator_area">
          <h2>{field.label}</h2>
          <hr />
          <div className='wrap'>
            <span>{field.expression_first}</span>
            <span>&times;</span>
            <span>{field.expression_last}</span>
            <span>=</span>
            <input type="text" className="value_area" size={5}></input>
          </div>
          <div className='wrap'>
            <button
              className="btn_checked"
              onClick={(e) =>
                BaseData.change(i, document.querySelector(".value_area").value)
              }
            >
              Check
            </button>
            <button
              className="btn_help"
              onClick={(e) =>
                BaseData.help(i, document.querySelector(".answer"))
              }
            >
              Help
            </button>
          </div>

          <p className="error">
            {field.valid === null || field.value === ""
              ? ""
              : field.valid
              ? field.congrate
              : field.errorMessage}
          </p>
          <p className="answer"></p>
          <hr />
          <button
            className="button_success"
            onClick={this.increase}
            disabled={!field.valid}
          >
            Next
          </button>
        </div>
      );
    });

    return <React.Fragment>{data[this.state.cnt]}</React.Fragment>;
  }
}
