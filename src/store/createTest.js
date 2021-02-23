import React from "react";
import { observable, computed, action } from "mobx";



class CreateTest {
 
  @observable testForm = [
    {
      name: "first",
      label: "First part of expressions:",
      value: "",
      placeholder: "Enter value",
      errorMessage: "Enter correct value",
      valid: null,
      validator: (val) => /^[0-9]{1,10}$/.test(val),
    },
    {
      name: "second",
      label: "Second part of expressions:",
      value: "",
      placeholder: "Enter value",
      errorMessage: "Enter correct value",
      valid: null,
      validator: (val) => /^[0-9]{1,10}$/.test(val),
    },
    {
      name: "answer",
      label: "Corret answer:",
      value: "",
      placeholder: "Enter value",
      errorMessage: "Enter correct value",
      valid: null,
      validator: (val) => /^[0-9]{1,15}$/.test(val),
    },
  ];

  @computed get isValid() {
    return this.testForm.every((field) => field.valid);
  }
  @computed get formInfo() {
    let info = {};

    this.testForm.forEach((field) => {
      info[field.name] = field.value;
    });

    return info;
  }

  @action change(ind, value) {
    let field = this.testForm[ind];
    field.value = value;
    field.valid = field.validator(field.value);
  }

}
export default new CreateTest();
