import React from "react";
import { observable, computed, action } from "mobx";

class BaseMath extends React.Component {
  @observable baseMath = [];
  @action async Render(ind) {
    try {
      let response = await fetch(
        `https://newapp-cf6c2-default-rtdb.firebaseio.com/tests/${ind}.json`
      );
      let data = await response.json();
      this.baseMath = data;
    } catch (e) {
      console.log(e);
    }
    console.log(this.baseMath);
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
