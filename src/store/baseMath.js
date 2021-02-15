import React from "react";
import { observable, computed, action } from "mobx";

class BaseMath {
  @observable baseMath = [
    {
      name: "Multiplication",
      label: "Muliplication Table",
      expression_first: "4",
      expression_last: "2",
      value: "",
      errorMessage: "Enter correct answer",
      congrate: "GOOD JOB! Go to the next task",
      answer: "Correct answer: 8",
      valid: null,
      validator: (val) => /^8/.test(val),
    },
    {
      name: "Multiplication1",
      label: "Muliplication Table",
      expression_first: "7",
      expression_last: "8",
      value: "",
      errorMessage: "Enter correct answer",
      congrate: "GOOD JOB! Go to the next task",
      answer: "Correct answer: 56",
      valid: null,
      validator: (val) => /^56/.test(val),
    },
    {
      name: "Multiplication2",
      label: "Muliplication Table",
      expression_first: "9",
      expression_last: "4",
      value: "",
      errorMessage: "Enter correct answer",
      congrate: "GOOD JOB! Go to the next task",
      answer: "Correct answer: 32",
      valid: null,
      validator: (val) => /^32/.test(val),
    },
    {
      name: "Multiplication3",
      label: "Muliplication Table",
      expression_first: "3",
      expression_last: "0",
      value: "",
      errorMessage: "Enter correct answer",
      congrate: "GOOD JOB! Go to the next task",
      answer: "Correct answer: 0",
      valid: null,
      validator: (val) => /^0/.test(val),
    },
  ];
  @computed get isValid() {
    return this.baseMath.every((field) => field.valid);
  }

  @computed get Result() {
    let res = {};

    this.baseMath.forEach((field) => {
      res[field.name] = field.value;
    });

    return res;
  }

  @action change(ind, value) {
    let field = this.baseMath[ind];
    field.value = value;
    field.valid = field.validator(field.value);
  }

  @action help(ind, selector) {
    let field = this.baseMath[ind];
    selector = selector.innerText = field.answer;
  }
}

export default new BaseMath();
