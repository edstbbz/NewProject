import React from "react";
import { observable, computed, action } from "mobx";
import { TO_DATABASE } from "../api/httpConst";

class BaseMath extends React.Component {
  @observable baseMath = [];
  @action async Render(ind) {
    let url = `${TO_DATABASE}tests/${ind}.json`;
    try {
      let response = await fetch(url);
      let data = await response.json();
      this.baseMath = data;
    } catch (e) {
      console.log(e);
    }
  }

  @computed get isValid() {
    return this.baseMath.every((field) => field.valid);
  }

  @action Clear() {
    this.baseMath = [];
  }

  @computed get isLoader() {
    let load = true;
    if (this.baseMath.length == 0) {
      load = true;
    }
    if (this.baseMath.length > 0) {
      load = false;
    }
    return load;
  }

  @action Loading() {
    this.isLoading = false;
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

    field.value == field.answer ? (field.valid = true) : (field.valid = false);
  }

  @action help(ind, selector) {
    let field = this.baseMath[ind];
    selector = selector.innerText = field.answerCorrect;
  }
}

export default new BaseMath();
