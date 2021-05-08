import React from "react";
import Button from "../../components/button/Button";
import RadioButton from "../../components/radioButton/radio";

export default class ChangeTestName extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h2>Change test name: </h2>
        <hr />
        <div>
          Change difficult:
          <RadioButton onChange={this.props.baseRadio} check={true}>
            Base
          </RadioButton>
          <RadioButton onChange={this.props.averageRadio} check={false}>
            Average
          </RadioButton>
        </div>
        <p style={{ color: "rgba(252, 63, 63, 0.644)" }}>
          {this.props.valid || this.props.testName == ""
            ? ""
            : "Enter correct text name (4-30 symbol)"}
        </p>
        <input
          className="input"
          id="input"
          type="text"
          value={this.props.testName}
          onChange={this.props.onChange}
          placeholder="Enter test name: "
        />
        <Button
          style={{
            height: "3rem",
            width: "100%",
            margin: "0rem 0rem 1rem",
          }}
          type="success"
          onClick={this.props.onClick}
          disabled={!this.props.valid}
        >
          Go to create
        </Button>
        <hr id="hr" />
        <p
          style={{
            color: "rgba(252, 63, 63, 0.644)",
            fontSize: "2.5 rem",
          }}
        >
          In order to create a test, you need to create at least 5 tasks!
        </p>
      </React.Fragment>
    );
  }
}
