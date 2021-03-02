import React from "react";
import { observable, computed, action } from "mobx";
import { LOG_IN_USER, TO_DATABASE } from "../api/httpConst";
import fetchHelper from "../api/fetchHelper";

class OrderLog {
  @observable formData = [
    {
      name: "name",
      label: "Name:",
      value: "",
      placeholder: "Enter your name",
      errorMessage: "Enter correct name",
      valid: null,
      validator: (val) => /^[aA-zZ]{2,30}$/.test(val),
    },
    {
      name: "password",
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

  @computed get isDisabled() {
    let disable = this.disabled;
    return disable;
  }

  @computed get isMessage() {
    let errorMessage = this.message;
    return errorMessage;
  }

  @computed get isValid() {
    return this.formData.every((field) => field.valid);
  }
  @computed get userInfo() {
    let info = {};

    this.formData.forEach((field) => {
      info[field.name] = field.value;
    });

    return info;
  }

  @action change(ind, value) {
    let field = this.formData[ind];
    field.value = value;
    field.valid = field.validator(field.value);
  }

  @action reset() {
    this.formData.forEach((field) => {
      field.value = ''
    })
    setTimeout(() => {
      this.message = null
    }, 3000);
  }

  @action async userNameToEmail() {
    const urlDB = `${TO_DATABASE}/users.json`;
    try {
      let mail = "";
      let response = await fetch(urlDB);
      let data = await response.json();
      Object.values(data).forEach((field) => {
        if (this.userInfo.name == field.name) {
          mail = field.email;
        }
      });
      return mail
    } catch (e) {}
  }

  @action logIn = async () => {
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
        this.reset()
      }
      if (!response.ok) {
        this.message = data.error.message;
        this.reset()
        throw new Error(data.error.message);
      }
    } catch (e) {
      this.disabled = false;
    }
  };
}
export default new OrderLog();
