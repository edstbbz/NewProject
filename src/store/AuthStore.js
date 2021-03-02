import React from "react";
import { observable, computed, action } from "mobx";
import fetchHelper from "../api/fetchHelper";
import { SIGN_UP_USER, TO_DATABASE, LOG_IN_USER } from "../api/httpConst";
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
      valid: null,
      validator: (val) => /^[aA-zZ]{2,30}$/.test(val),
    },
    {
      name: "email",
      type: "text",
      label: "Email:",
      value: "",
      placeholder: "Enter your email",
      errorMessage: "Incorrect, example: User@mail.com",
      valid: null,
      validator: (val) => /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(val),
    },
    {
      name: "password",
      type: "password",
      label: "Password:",
      value: "",
      placeholder: "Enter your password",
      errorMessage: "Enter correct password (6-12 symbol)",
      valid: null,
      validator: (val) => /^[0-9]{6,12}$/.test(val),
    },
  ];

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

  @action showPassword(type){
    let field = this.formData[2];
    let key = false;
    if(field.type == 'password' && key === false){
      this.showPassIcon = faEyeSlash
      key = true
      return field.type = 'text'
      
    }
    if(field.type == 'text'){
      this.showPassIcon = faEye
      key = false
      return field.type = 'password'
      
    }
  }

  @action change(ind, value) {
    let field = this.formData[ind];
    field.value = value;
    field.valid = field.validator(field.value);
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
        localStorage.setItem("idToken", data.idToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        await this.userDataToDB(data.localId);
        this.disabled = false;
        this.auth = true;
        this.userName = localStorage.getItem("name");
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
        localStorage.setItem("idToken", data.idToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        this.disabled = false;
        this.auth = true;
        this.userName = localStorage.getItem("name");
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
