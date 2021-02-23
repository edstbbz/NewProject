import React from "react";
import CreateTest from "../../store/createTest";
import Select from "../Select/select";
import { observer } from "mobx-react";
import "./createTest.module.scss";
import Button from "../button/Button";

@observer
export default class extends React.Component {
  state = {
    test: [],
    operation: "\u002B",
    testName: "",
    requiredSelect: true,
    changeForm: false,
    returnVisible: true,
    valid: null,
  };

  addQuestionHandler = (e) => {
    e.preventDefault();

    const operation = this.state.operation;
    const test = this.state.test;
    const index = test.length + 1;
    let testname = this.state.testName;
    let first = CreateTest.formInfo.first;
    let second = CreateTest.formInfo.second;
    let answer = CreateTest.formInfo.answer;

    const testItem = {
      testname: testname.toUpperCase(),
      id: index,
      first: first,
      second: second,
      answer: answer,
      operation: operation,
      errorMessage: "Enter correct answer",
      congrate: "GOOD JOB! Go to the next task",
      answerCorrect: `Correct answer: ${answer}`,
      valid: null,
    };

    test.push(testItem);

    this.setState({
      test,
      returnVisible: false,
      operation: "\u002B",
    });

    this.resetValueHandler();
  };

  createTestHandler = async (e, props) => {
    e.preventDefault();
    try {
      await fetch(
        "https://newapp-cf6c2-default-rtdb.firebaseio.com/tests.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          mode: "cors",
          body: JSON.stringify(this.state.test),
        }
      );

      this.setState({
        test: [],
        operation: "",
        testName: "",
        requiredSelect: true,
        changeForm: false,
        returnVisible: true,
        valid: null,
      });
    } catch (e) {
      console.log(e);
    }
    this.props.reRender();
  };

  selectChangeHandler = (e) => {
    this.setState({
      operation: e.target.value,
      requiredSelect: false,
    });
  };

  testNameChangeHandler = (value) => {
    let val = /^[aA-zZ]{4,30}$/.test(value);
    if (val) {
      this.setState({ valid: true });
    } else {
      this.setState({ valid: false });
    }

    this.setState({
      testName: value,
    });
  };

  returnToTestName = () => {
    this.setState({
      changeForm: false,
    });
  };

  goToCreateHandler = () => {
    this.setState({
      changeForm: true,
    });
  };

  resetValueHandler = (e) => {
    CreateTest.testForm.map((field) => {
      field.value = "";
    });
  };

  render() {
    let formFields = CreateTest.testForm.map((field, i) => {
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
            onChange={(e) => CreateTest.change(i, e.target.value)}
          ></input>
        </label>
      );
    });

    const select = (
      <Select
      style={{fontSize: '1.5rem', height: '2.5rem', width: '20%', margin: '0'}}
        label="Change operation:"
        value={this.state.operation}
        required={this.state.requiredSelect}
        onChange={this.selectChangeHandler}
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

    return (
      <React.Fragment>
        <div className="createTest">
          <form id="form">
            {!this.state.changeForm == false ? (
              <React.Fragment>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <h2>Create new test:</h2>
                  {this.state.returnVisible == true ? (
                    <Button
                      style={{ height: "3rem", width: "30%" }}
                      type="primary"
                      onClick={this.returnToTestName}
                    >
                      Return
                    </Button>
                  ) : (
                    <Button
                      style={{ height: "3rem", width: "30%" }}
                      type="success"
                      onClick={this.createTestHandler}
                    >
                      Create
                    </Button>
                  )}
                </div>

                <hr />
                {formFields}
                {select}
                <hr />

                <Button
                  style={{ height: "3rem", width: "100%" }}
                  type="success"
                  onClick={this.addQuestionHandler}
                  disabled={!CreateTest.isValid}
                >
                  Add a question
                </Button>
                <p>Added question: {this.state.test.length}</p>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h2>Change test name: </h2>
                <hr />
                <p style={{ color: "rgba(252, 63, 63, 0.644)" }}>
                  {this.state.valid || this.state.testName == ""
                    ? ""
                    : "Enter correct text name (4-30 symbol)"}
                </p>
                <input
                  className="input"
                  id="input"
                  type="text"
                  value={this.state.testName}
                  onChange={(e) => this.testNameChangeHandler(e.target.value)}
                  placeholder="Enter test name: "
                />
                <Button
                  style={{ height: "3rem", width: "100%", margin: "1rem 0rem" }}
                  type="success"
                  onClick={this.goToCreateHandler}
                  disabled={!this.state.valid}
                >
                  Go to create
                </Button>
                <hr />
                <p style={{ color: "rgba(252, 63, 63, 0.644)", fontSize: "2.5 rem" }}>
                  In order to create a test, you need to create at least 5
                  tasks!
                </p>
              </React.Fragment>
            )}
          </form>
        </div>
      </React.Fragment>
    );
  }
}
