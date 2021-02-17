import React from "react";
import style from "./loading.module.scss";

const Loader = (props) => (
  <div className={style.center}>
    <div className={style.Loader}>
      <div />
      <div />
    </div>
  </div>
);

export default Loader;
