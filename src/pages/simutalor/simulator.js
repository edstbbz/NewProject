import React from "react";
import { NavLink } from "react-router-dom";
import { routesMap } from "../../router/routes";
import { observer } from "mobx-react";
import "./simulator.module.scss";
import CreateTest from "../../components/createTest/createTest";
import WindowBoard from "../../components/wrap/window";
import Loader from "../../components/loading/loading";
import Select from "../../components/Select/select";
import BaseMath from "../../store/baseMath";
import Button from "../../components/button/Button";

const url = "https://newapp-cf6c2-default-rtdb.firebaseio.com/tests.json";

@observer
export default class extends React.Component {
  state = {
    baseTests: [],
    baseTestsLink: [],
    loading: true,
    operation: "Base",
    baseMath: [],
    fetch: false,
    windowSize: 0,
    create: false,
  };
  updateSize = () => {
    this.setState({ windowSize: window.innerWidth });
  };

  createView = () => {
    this.setState({ create: !this.state.create });
  };

  componentDidMount() {
    this.Upload();
    window.addEventListener("resize", this.updateSize());
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.updateSize());
  }

  Upload = async () => {
    try {
      let response = await fetch(url);
      let data = await response.json();
      const baseTests = [];
      const baseTestsLink = [];

      Object.values(data).forEach((field, index) => {
        let names = field.map((field) => {
          return field.testname;
        });
        baseTests.push({
          id: index,
          name: names[0],
        });
      });

      Object.keys(data).forEach((key, index) => {
        baseTestsLink.push({
          id: key,
          index: index,
        });
      });

      this.setState({
        baseTests,
        baseTestsLink,
        loading: false,
        fetch: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  renderBaseTest() {
    let name = this.state.baseTests.map((test, ind) => {
      return test.name;
    });
    return this.state.baseTestsLink.map((test, i) => {
      let ind = test.id;
      return (
        <li key={test.id} style={{ marginLeft: "0.5rem" }}>
          <NavLink
            to={"/simulator/base/" + ind}
            className="simulator_nav-item"
            onClick={(e) => BaseMath.Render(ind)}
          >
            {`${name[i]}`}
          </NavLink>
        </li>
      );
    });
  }

  renderAverageTest() {
    return this.state.baseTests.map((test) => {
      return (
        <li key={test.id}>
          <NavLink to={routesMap.average} className="simulator_nav-item">
            Average
          </NavLink>
        </li>
      );
    });
  }

  selectChangeHandler = (e) => {
    this.setState({
      operation: e.target.value,
    });
  };

  render() {
    const select = (
      <Select
        label="Select difficulty level:"
        pStyle={{ fontSize: "0.9rem", opacity: "0.7", textAlign: "center" }}
        value={this.state.operation}
        required={this.state.requiredSelect}
        onChange={this.selectChangeHandler}
        options={[
          {
            text: "Base",
            value: "Base",
          },
          {
            text: "Average",
            value: "Average",
          },
        ]}
      />
    );
    return (
      <React.Fragment>
        {!this.state.create ? (
          <div className="simulator">
            <div className="simulator_nav">
              <h1 className="simulator_nav-title">Navigation</h1>
              <h2> {select} </h2>
              <h3 style={{ margin: "0", padding: "0.5rem" }}>Test list:</h3>
              {this.state.loading ? (
                <Loader />
              ) : (
                <ul className="simulator_navpanel">
                  {this.state.operation == "Base"
                    ? this.renderBaseTest()
                    : this.renderAverageTest()}
                </ul>
              )}
              {this.state.windowSize < 750 ? (
                <Button type="primary" onClick={this.createView}>
                  Go to creating a new test
                </Button>
              ) : null}
            </div>
            {this.state.windowSize > 750 ? (
              <div className="simulator_create">
                <WindowBoard style={{ maxWidth: "750px" }}>
                  <CreateTest reRender={() => this.Upload()} />
                </WindowBoard>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="simulator_create">
            <WindowBoard style={{ maxWidth: "750px", margin: '0', padding: '2rem' }}>
              <CreateTest reRender={() => this.Upload()} />
              <Button type="primary" onClick={this.createView}>
                Return to tests
              </Button>
            </WindowBoard>
          </div>
        )}
      </React.Fragment>
    );
  }
}
