import React from "react";
import { NavLink } from "react-router-dom";
import { routesMap } from "../../router/routes";
import "./simulator.module.scss";
import CreateTest from "../../forms/createTest/createTest";
import WindowBoard from "../../components/wrap/window";
import Loader from "../../components/loading/loading";
import Select from "../../components/Select/select";
import BaseMath from "../../store/baseMath";
import RedirectTo from "../../components/redirectBody/redirectBody";
import Button from "../../components/button/Button";
import { TO_DATABASE } from "../../api/httpConst";
import { inject, observer } from "mobx-react";
import AdvancedMath from "../../forms/createAdvTest/advTest";

@inject("store")
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
    let url = `${TO_DATABASE}tests.json`;
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
            style={{ color: this.props.store.CreateTestBase.color }}
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

  navigation = () => {
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
          this.props.store.AuthStore.isAuth === true ? (
            <div className="simulator_createtest-btn">
              <Button
                className="createtest-btn"
                type="primary"
                onClick={this.createView}
              >
                Go to creating a new test
              </Button>
            </div>
          ) : (
            <RedirectTo
              style={{ margin: "30px" }}
              btnText={"Authorization"}
              onClick={this.toLoginPage}
            >
              To create new tests, you need to be authorized:
            </RedirectTo>
          )
        ) : null}
      </div>
    );
  };

  createTest = () => {
    return this.state.windowSize > 750 ? (
      <div className="simulator_create">
        <WindowBoard classWinDow='simulator-mod' style={{ maxWidth: "750px" }}>
          <CreateTest reRender={() => this.Upload()} />
        </WindowBoard>
      </div>
    ) : null;
  };

  createTestSmallView = () => {
    return (
      <div className='simulator_small-create'>
        <div className="simulator_create">
          <WindowBoard
            style={{ maxWidth: "750px" }}
          >
            <CreateTest reRender={() => this.Upload()} />
            <Button type="primary" onClick={this.createView}>
              Return to tests
            </Button>
          </WindowBoard>
        </div>
      </div>
    );
  };
  toLoginPage = () => {
    return this.props.history.push(routesMap.login);
  };
  render() {
    return (
      <React.Fragment>
        {!this.state.create ? (
          <div className="simulator">
            {this.navigation()}
            {this.props.store.AuthStore.isAuth === true ? (
              this.createTest()
            ) : this.state.windowSize > 750 ? (
              <RedirectTo
                btnText={"Go to Authorization"}
                onClick={this.toLoginPage}
              >
                To create new tests, you need to be authorized:
              </RedirectTo>
            ) : null}
          </div>
        ) : (
          this.createTestSmallView()
        )}
      </React.Fragment>
    );
  }
}
