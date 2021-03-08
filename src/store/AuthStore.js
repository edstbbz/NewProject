import React from "react";
import { observable, computed, action } from "mobx";
import fetchHelper from "../api/fetchHelper";
import {
  SIGN_UP_USER,
  TO_DATABASE,
  LOG_IN_USER,
  REFRESH_TOKEN,
} from "../api/httpConst";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

class Order {
  @observable formData = [
    {
      name: "name",
      type: "text",
      label: "Name:",
      value: "",
      placeholder: "Enter your name",
      errorMessage: "Incorrect, example: John",
      touched: false,
      valid: null,
      class: null,
      validator: (val) => /^[aA-zZ]{2,30}$/.test(val),
    },
    {
      name: "email",
      type: "text",
      label: "Email:",
      value: "",
      placeholder: "Enter your email",
      errorMessage: "Incorrect, example: User@mail.com",
      touched: false,
      valid: null,
      class: null,
      validator: (val) =>
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(val),
    },
    {
      name: "password",
      type: "password",
      label: "Password:",
      value: "",
      placeholder: "Enter your password",
      errorMessage: "Password length can't be less then 6",
      touched: false,
      valid: null,
      class: null,
      validator: (val) => /^[A-Za-z0-9]{6,12}$/.test(val),
    },
  ];

  @observable stayLoggedIn = false;
  @observable message = null;
  @observable disabled = false;
  @observable auth = false;
  @observable userName = localStorage.getItem("name");
  @observable showPassIcon = faEye;

  @computed get isDisabled() {
    let disable = this.disabled;
    return disable;
  }

  @computed get isAuth() {
    let auth = this.auth;
    return auth;
   
  }

  @computed get isUserName() {
    let name = this.userName;
    return name;
  }

  @computed get isMessage() {
    let errorMessage = this.message;
    return errorMessage;
  }

  @computed get isValidforSignUp() {
    return this.formData.every((field) => field.valid);
  }

  @computed get isValidforLogIn() {
    let data = this.formData.filter((field, i) => i !== 1);
    return data.every((field) => field.valid);
  }

  @computed get userInfo() {
    let info = {};

    this.formData.forEach((field) => {
      info[field.name] = field.value;
    });

    return info;
  }

  @action autoLogIn() {
    const token = localStorage.getItem("idToken");
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    const stay = Boolean(localStorage.getItem("stay"));
    let time = (expirationDate.getTime() - new Date().getTime()) / 1000;

    if (!token) {
      this.logOut();
    }
    if (expirationDate <= new Date() && stay !== true) {
      this.logOut();
    }
    if (expirationDate >= new Date() && stay !== true) {
      this.auth = true;
      this.autoLogOut((expirationDate.getTime() - new Date().getTime()) / 1000);
    }
    if (stay === true) {
      this.auth = true;
      setTimeout(() => {
        this.refreshUserToken();
      }, time * 1000 );
      
    }
  }

  @action refreshUserToken = async () => {
    const refreshData = {
      grant_type: "refresh_token",
      refresh_token: localStorage.getItem("refreshToken"),
    };
    const url = REFRESH_TOKEN;
    const method = "POST";
    const type = "application / x-www-form-urlencoded";
    try {
      let response = await fetchHelper(url, method, refreshData, type);
      let data = await response.json();
      if (response.ok) {
        const expirationDate = new Date(
          new Date().getTime() + data.expires_in * 1000
        );
        localStorage.setItem("idToken", data.id_token);
        localStorage.setItem("refreshToken", data.refresh_token);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("time", data.expires_in);
        this.auth = true;
      }
      if (!response.ok) {
        this.message = data.error.message;
        this.reset();
        throw new Error(data.error.message);
      }
    } catch (e) {
      this.message = e;
    }
  };

  @action autoLogOut(time) {
    if (this.auth === true && this.stayLoggedIn === false) {
      setTimeout(() => {
        this.logOut();
        this.message = "SESSION_OUT";
        this.reset();
      }, time * 1000);
    }
  }

  @action showPassword() {
    let field = this.formData[2];
    let key = false;
    if (field.type == "password" && key === false) {
      this.showPassIcon = faEyeSlash;
      key = true;
      return (field.type = "text");
    }
    if (field.type == "text") {
      this.showPassIcon = faEye;
      key = false;
      return (field.type = "password");
    }
  }

  @action blur(i, valid, value) {
    let field = this.formData[i];
    if (valid || value.length === 0) {
      field.touched = false;
    } else {
      field.touched = true;
    }
    if (valid) {
      field.class = "valid";
    }
    if (!valid && value.length !== 0) {
      field.class = "invalid";
    }
    if (value.length === 0) {
      field.class = "";
    }
  }

  @action checked() {
    this.stayLoggedIn = !this.stayLoggedIn;
  }

  @action change(ind, value) {
    let field = this.formData[ind];
    field.value = value;
    field.valid = field.validator(field.value);
    if (field.valid || field.class === "vaild") {
      field.class = "";
    }
  }

  @action reset() {
    this.formData.forEach((field) => {
      field.value = "";
    });
    setTimeout(() => {
      this.message = null;
    }, 3000);
  }

  @action logOut = () => {
    this.auth = false;
    localStorage.clear();
    this.userName = localStorage.getItem("name");
  };

  @action userDataToDB = async (uid) => {
    const Data = {
      name: this.userInfo.name,
      email: this.userInfo.email,
    };
    const url = `${TO_DATABASE}users/${uid}.json`;
    const method = "PUT";
    try {
      localStorage.setItem("name", this.userInfo.name);
      localStorage.setItem("email", this.userInfo.email);
      await fetchHelper(url, method, Data);
    } catch (e) {
      console.log(e);
    }
  };

  @action authHandler = async () => {
    const AuthData = {
      email: this.userInfo.email,
      password: this.userInfo.password,
      returnSecureToken: true,
    };
    const url = SIGN_UP_USER;
    const method = "POST";
    try {
      this.disabled = true;
      let response = await fetchHelper(url, method, AuthData);
      let data = await response.json();
      if (response.ok) {
        const expirationDate = new Date(
          new Date().getTime() + data.expiresIn * 1000
        );
        localStorage.setItem("idToken", data.idToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("time", data.expiresIn);
        await this.userDataToDB(data.localId);
        this.disabled = false;
        this.auth = true;
        this.userName = localStorage.getItem("name");
        localStorage.setItem("stay", this.stayLoggedIn);
        this.autoLogOut(data.expiresIn);
      }
      if (!response.ok) {
        this.message = data.error.message;
        this.reset();
        throw new Error(data.error.message);
      }
    } catch (e) {
      this.message = e;
      this.disabled = false;
    }
  };

  @action async userNameToEmail() {
    const urlDB = `${TO_DATABASE}/users.json`;
    try {
      let mail = "";
      let response = await fetch(urlDB);
      let data = await response.json();
      Object.values(data).forEach((field) => {
        if (this.userInfo.name == field.name) {
          mail = field.email;
          localStorage.setItem("name", field.name);
        }
      });
      return mail;
    } catch (e) {}
  }

  @action loginHandler = async () => {
    const AuthData = {
      email: await this.userNameToEmail(),
      password: this.userInfo.password,
      returnSecureToken: true,
    };
    const url = LOG_IN_USER;
    const method = "POST";
    try {
      this.disabled = true;

      let response = await fetchHelper(url, method, AuthData);
      let data = await response.json();
      if (response.ok) {
        const expirationDate = new Date(
          new Date().getTime() + data.expiresIn * 1000
        );
        localStorage.setItem("idToken", data.idToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("time", data.expiresIn);
        localStorage.setItem("stay", this.stayLoggedIn);
        this.disabled = false;
        this.auth = true;
        this.userName = localStorage.getItem("name");
        this.autoLogOut(data.expiresIn);
        this.reset();
      }
      if (!response.ok) {
        this.message = data.error.message;
        this.reset();
        throw new Error(data.error.message);
      }
    } catch (e) {
      this.disabled = false;
    }
  };
}
export default new Order();
