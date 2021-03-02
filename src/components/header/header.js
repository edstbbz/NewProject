import React from "react";
import ReactDOM from "react-dom";
import { inject, observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { routesMap } from "../../router/routes";
import ToggleTheme from "../toggleTheme/toggleTheme";
import UserModal from "../userModal/userModal";
import "./header.module.scss";
import NavigationToggle from "../navigation/navigation";
import Burger from "../burger/burger";

@inject("store")
@observer
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.userRef = React.createRef();
  }
  state = {
    blackTheme: false,
    menu: false,
    userMenu: false,
    stroke: "black",
    fill: "yellow",
    bg: "white",
    userModal: "",
    width: null,
    clicked: 0,
    clickOnItem: false,
  };

  resize = () => this.setState({ width: window.innerWidth });

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  componentDidMount() {
    this.setState({ width: window.innerWidth });
    window.addEventListener("resize", this.resize);
    if(this.props.store.AuthStore.isAuth === true){
      document.addEventListener("click", this.handleClickOutside, true);
    }
    
  }

  toggleUserMenu = () => {
    this.setState({
      userMenu: !this.state.userMenu,
    });
  };

  toggleHandler = () => {
    this.setState({
      menu: !this.state.menu,
      clicked: this.state.clicked + 1,
    });
  };

  closeHandler = () => {
    this.setState({
      menu: false,
      clicked: this.state.clicked + 1,
    });
  };

  handleClickOutside = (e) => {
    const node = this.ref.current;
    const user = this.userRef.current;
    if (!node || (!node.contains(e.target) && !user.contains(e.target))) {
      this.setState({
        userMenu: false,
      });
    }
  };

  logOutUser = () => {
    this.props.store.AuthStore.logOut()
    this.setState({userMenu: false})
  }

  userMenu = () => {
    const store = this.props.store.AuthStore;
    return (
      <CSSTransition
        in={this.state.userMenu}
        timeout={{ enter: 200, exit: 200 }}
        classNames="usermodal"
        mountOnEnter
        unmountOnExit
      >
        <UserModal
          linkStyle={{ color: this.props.store.CreateTestBase.color }}
          bodyStyle={{ background: this.state.userModal }}
          name={store.isUserName}
          onClick={this.logOutUser}
          isOpen={this.state.userMenu}
          to={routesMap.simulator}
          reset={() => this.setState({userMenu: false})}
          ref={this.ref}
        ></UserModal>
      </CSSTransition>
    );
  };

  toggleTheme = () => {
    return (
      <React.Fragment>
        <div className="theme_li">
          <button
            className="theme_btn"
            onClick={() => this.changeThemeHandler()}
          >
            <svg viewBox="0 0 24 24" style={{ width: "24px", height: "24px" }}>
              <path
                fill={this.state.fill}
                stroke={this.state.stroke}
                strokeWidth="2"
                d="M12,17.5 C15.0375661,17.5 17.5,15.0375661 17.5,12 C17.5,8.96243388 15.0375661,6.5 12,6.5 C8.96243388,6.5 6.5,8.96243388 6.5,12 C6.5,15.0375661 8.96243388,17.5 12,17.5 Z M12,6.5 L12,1 M12,23 L12,17.5 M1,12 L6.5,12 M17.5,12 L23,12 M4.4375,4.4375 L8.5625,8.5625 M15.4375,15.4375 L19.5625,19.5625 M19.5625,4.4375 L15.4375,8.5625 M8.5625,15.4375 L4.4375,19.5625"
              ></path>
            </svg>
          </button>
        </div>
      </React.Fragment>
    );
  };

  changeThemeHandler = () => {
    let body = document.querySelector("body");
    let a = document.getElementsByTagName("a");
    if (this.state.blackTheme) {
      body.style = "";
      for (let item of a) {
        item.style.color = "black";
      }
      this.setState({
        stroke: "black",
        fill: "yellow",
        userModal: "",
        bg: "white",
      });
      this.props.store.CreateTestBase.dark();
    } else {
      body.style.backgroundColor = "black";
      body.style.color = "#f3f3f3";
      for (let item of a) {
        item.style.color = "#f3f3f3";
      }
      this.setState({
        stroke: "#f3f3f3",
        fill: "",
        userModal: "#4e4e4e",
        bg: "black",
      });
      this.props.store.CreateTestBase.light();
    }
    this.setState({ blackTheme: !this.state.blackTheme });
  };

  clickOnNavItem = () => {
    this.setState({clickOnItem: !this.state.clickOnItem })
  }

  navigationList = () => {
    const store = this.props.store.AuthStore;
    let mgRight = "";
    if (store.isAuth) {
      mgRight = "80px";
    }
    return (
      <ul className="header_nav" style={{ marginRight: mgRight }}>
        <li onClick={this.clickOnNavItem}>
          <NavLink exact to={routesMap.home} className="header_nav-item">
            Home
          </NavLink>
        </li>
        <li onClick={this.clickOnNavItem}>
          <NavLink to={routesMap.simulator} className="header_nav-item">
            Simulator
          </NavLink>
        </li>
        {store.isAuth === false ? (
          <li onClick={this.clickOnNavItem}>
            <NavLink to={routesMap.login} className="header_nav-item">
              Log In
            </NavLink>
          </li>
        ) : null}
      </ul>
    );
  };

  render() {
    const store = this.props.store.AuthStore;
    return (
      <React.Fragment>
        <NavigationToggle
          storeIsAuth={store.isAuth}
          onClose={this.closeHandler}
          isOpen={this.state.menu}
          dark={this.state.blackTheme}
        ></NavigationToggle>
        {this.state.width < 650 ? (
          <Burger
            style={{ background: this.state.stroke }}
            onClick={this.toggleHandler}
            isOpen={this.state.menu}
            isClicked={this.state.clicked}
            dark={this.state.blackTheme}
          />
        ) : null}
        <header className="layout_header" style={{ background: this.state.bg }}>
          <div className="header">
            <h1 className="header_title">MathSimulator</h1>
            {this.state.width > 650 ? this.navigationList() : null}
            {store.isAuth === true ? (
              <div className="header_username">
                <FontAwesomeIcon
                  icon={faUser}
                  color="#9ddc5e"
                  style={{ marginRight: "5px" }}
                />
                <a
                  ref={this.userRef}
                  onClick={this.toggleUserMenu}
                  className="username_item"
                >
                  {store.isUserName}
                </a>
              </div>
            ) : null}
            <ToggleTheme
              onClick={this.changeThemeHandler}
              fill={this.state.fill}
              stroke={this.state.stroke}
            />
          </div>
          {this.userMenu()}
        </header>
      </React.Fragment>
    );
  }
}
