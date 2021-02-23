import React from "react";
import "./modalBody.module.scss";

const Modal = (props) => {
  const close = (e) => {
    e.preventDefault();

    if (props.onClose) {
      props.onClose();
    }
  };

  if (props.isOpen === false) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="modal">
        <div className="modal_close" onClick={(e) => close(e)}>
          &times;
        </div>
        <div className="modal_content">{props.children}</div>
      </div>
      <div className="bg" onClick={(e) => close(e)} />
    </React.Fragment>
  );
};

export default Modal;
