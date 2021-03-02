import React from "react";
import PropTypes from "prop-types";
import BaseData from "../../store/baseMath";
import Modal from "../../components/modal/modalBody";
import { observer } from "mobx-react";
import { routesMap } from "../../router/routes";
import { Redirect } from "react-router-dom";
import Button from "../../components/button/Button";

@observer
export default class extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  };

  state = {
    cnt: 0,
    isModalOpen: false,
    redirect: false,
  };

  increase = () => {
    this.setState({ cnt: this.state.cnt + 1 });
    this.setState({ isModalOpen: true });
  };

  closeModal() {
    this.setState({ isModalOpen: false });
    this.setState({ redirect: true });
  }

  redirectTo() {
    this.setState({ redirect: false });
  }

  componentDidUpdate() {
    if (this.state.redirect === true) {
      this.redirectTo();
    }
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to={routesMap.simulator}></Redirect>;
    }

    let data = BaseData.baseMath.map((field, i) => {
      return (
        <div key={field.id} className="simulator_area">
          <h2>{field.testname}</h2>
          <hr />
          <div className="wrap">
            <span>{field.first}</span>
            <span>{field.operation}</span>
            <span>{field.second}</span>
            <span>=</span>
            <input type="text" className="value_area" size={5}></input>
          </div>
          <div className="wrap">
            <Button
              className='check'
              type="primary"
              onClick={(e) =>
                BaseData.change(i, document.querySelector(".value_area").value)
              }
            >
              Check
            </Button>
            <Button
              type="help"
              className='help'
              onClick={(e) =>
                BaseData.help(i, document.querySelector(".answer"))
              }
            >
              Help
            </Button>
          </div>

          <p className="error_answer">
            {field.valid == null || field.value === ""
              ? ""
              : field.valid
              ? field.congrate
              : field.errorMessage}
          </p>
          <p className="answer"></p>
          <hr />
          <Button
            type="success"
            style={{ height: "3rem", width: "100%", margin: "1rem 0"}}
            onClick={this.increase}
            disabled={!field.valid}
          >
            {this.state.cnt + 1 == BaseData.baseMath.length
              ? "Finish test"
              : "Next task"}
          </Button>
        </div>
      );
    });

    return (
      <React.Fragment>
        {data[this.state.cnt]}
        {this.state.cnt == data.length ? (
          <Modal
            isOpen={this.state.isModalOpen}
            onClose={() => this.closeModal()}
          >
            Congratulations, you have completed all tasks!
          </Modal>
        ) : null}
      </React.Fragment>
    );
  }
}
