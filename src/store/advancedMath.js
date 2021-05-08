import React from "react";
import { observable, computed, action } from "mobx";
import { TO_DATABASE } from "../api/httpConst";

class AdvancedMath {
  @observable Form = [
    {
      name: "textArea",
      type: "textarea",
      label: "Enter the task:",
      value: "",
      placeholder: "Enter the task...",
      valid: null,
      validator: (val) => /^\s*$/.test(val),
    },
  ];

  @observable FormAnswer = [
    {
      name: "answer",
      type: "text",
      label: "Enter your answer:",
      value: "",
      placeholder: "Enter your answer...",
      valid: null,
      validator: (val) => /^\s*$/.test(val),
    },
  ];

  @computed get isValidAnswer() {
    return this.FormAnswer.every((field) => field.valid);
  }
  
  @computed get formAnswerInfo() {
    let info = {};

    this.FormAnswer.forEach((field) => {
      info[field.name] = field.value;
    });

    return info;
  }

  @action changeInput(value) {
    let field = this.FormAnswer[0];
    field.value = value;
    field.valid = field.validator(field.value);
  }

  @computed get isValid() {
    return this.Form.every((field) => field.valid);
  }
  @computed get formInfo() {
    let info = {};

    this.Form.forEach((field) => {
      info[field.name] = field.value;
    });

    return info;
  }

  @action change(value) {
    let field = this.Form[0];
    field.value = value;
    field.valid = field.validator(field.value);
  }
}

export default new AdvancedMath();
