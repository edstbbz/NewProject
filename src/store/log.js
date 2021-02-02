import React from "react";
import { observable, computed, action } from "mobx";

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
      errorMessage: "Enter correct password (4-12 symbol)",
      valid: null,
      validator: (val) => /^[0-9]{4,12}$/.test(val),
    },
  ];

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
}
export default new OrderLog();