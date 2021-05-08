import React from "react";
import { inject, observer } from "mobx-react";
import Select from "../../components/Select/select";

@inject("store")
@observer
export default class BaseMath extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.CreateTestBase;
  }

  testField = () => {
    let formFields = this.store.testForm.map((field, i) => {
      return (
        <label key={field.name} className="authLabel">
          <div className="authName">
            <p> {field.label} </p>
            <p className="errorMessage">
              {field.valid === null || field.valid ? "" : field.errorMessage}
            </p>
          </div>

          <input
            type="text"
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => this.store.change(i, e.target.value)}
          ></input>
        </label>
      );
    });
    return formFields;
  };

  render() {
    const select = (
      <Select
        style={{
          fontSize: "1.5rem",
          height: "2.5rem",
          width: "20%",
          margin: "0",
        }}
        label="Change operation:"
        value={this.props.operation}
        required={this.props.requiredSelect}
        onChange={this.props.selectChangeHandler}
        options={[
          {
            text: "\u002B",
            value: "\u002B",
          },
          {
            text: "\u2212",
            value: "\u2212",
          },
          {
            text: "\u00D7",
            value: "\u00D7",
          },
          {
            text: "\u00F7",
            value: "\u00F7",
          },
        ]}
      />
    );
    return <React.Fragment>
        {this.testField()}
        {select}
        </React.Fragment>;
  }
}
