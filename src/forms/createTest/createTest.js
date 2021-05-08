import React from "react";
import Select from "../../components/Select/select";
import { inject, observer } from "mobx-react";
import "./createTest.module.scss";
import Button from "../../components/button/Button";
import fetchHelper from "../../api/fetchHelper";
import { TO_DATABASE } from "../../api/httpConst";
import RadioButton from "../../components/radioButton/radio";
import AdvancedMath from "../createAdvTest/advTest";
import ChangeTestName from "./createTestChange";
import BaseMath from "../createBaseTest/baseMath";

@inject("store")
@observer
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.CreateTestBase;
    this.authStore = this.props.store.AuthStore;
  }
  state = {
    test: [],
    operation: "\u002B",
    testName: "",
    requiredSelect: true,
    changeForm: false,
    valid: null,
    diff: false,
  };

  baseRadio = () => {
    this.setState({ diff: (this.state.diff = false) });
  };

  averageRadio = () => {
    this.setState({ diff: (this.state.diff = true) });
  };

  addQuestionHandler = (e) => {
    e.preventDefault();

    const operation = this.state.operation;
    const test = this.state.test;
    const index = test.length + 1;
    let testname = this.state.testName;
    let first = this.store.formInfo.first;
    let second = this.store.formInfo.second;
    let answer = this.store.formInfo.answer;

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
      operation: "\u002B",
    });

    this.resetValueHandler();
  };

  createTestHandler = async (e, props) => {
    e.preventDefault();
    const token = localStorage.getItem("idToken");
    let url = `${TO_DATABASE}tests.json?auth=${token}`;
    let data = this.state.test;
    let method = "POST";
    const expirationDate = new Date(localStorage.getItem("expirationDate"));

    try {
      if (expirationDate <= new Date()) {
        await this.authStore.refreshUserToken();
      }
      await fetchHelper(url, method, data);

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
      diff: false,
    });
  };

  goToCreateHandler = () => {
    this.setState({
      changeForm: true,
    });
  };

  resetValueHandler = (e) => {
    this.store.testForm.map((field) => {
      field.value = "";
      field.valid = null;
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="createTest">
          <form id="form">
            {!this.state.changeForm == false ? (
              <React.Fragment>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h2>Create new test:</h2>
                  {this.state.test.length < 5 ? (
                    <Button
                      className="btn-mod"
                      type="primary"
                      onClick={this.returnToTestName}
                    >
                      Return
                    </Button>
                  ) : (
                    <Button
                      className="btn-mod"
                      type="success"
                      onClick={this.createTestHandler}
                    >
                      Create
                    </Button>
                  )}
                </div>

                <hr />
                {this.state.diff === false ? (
                  <BaseMath
                    operation={this.state.operation}
                    requiredSelect={this.state.requiredSelect}
                    selectChangeHandler={this.selectChangeHandler}
                  />
                ) : (
                  <AdvancedMath />
                )}

                <hr />

                <Button
                  style={{ height: "3rem", width: "100%" }}
                  type="success"
                  onClick={this.addQuestionHandler}
                  disabled={!this.store.isValid}
                >
                  Add a question
                </Button>
                <p>Added question: {this.state.test.length}</p>
              </React.Fragment>
            ) : (
              <ChangeTestName
                baseRadio={this.baseRadio}
                averageRadio={this.averageRadio}
                valid={this.state.valid}
                testName={this.state.testName}
                onChange={(e) => this.testNameChangeHandler(e.target.value)}
                onClick={this.goToCreateHandler}
              />
            )}
          </form>
        </div>
      </React.Fragment>
    );
  }
}
