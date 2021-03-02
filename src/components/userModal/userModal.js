import React from "react";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import "./userModal.module.scss";

const UserModal = React.forwardRef((props, ref) => {
  return (
      <div className="usermodal_body" ref={ref} style={props.bodyStyle}>
        <footer className="usermodal_footer">
          <div className="user_avatar" style={props.avatarStyle}>
            <h1>A</h1>
          </div>
          <span className="usermodal_name">User: {props.name}</span>
        </footer>
        <section className="usermodal_section">
          <Link style={props.linkStyle} className="usermodal_profile" to={props.to} onClick={props.reset}>
            Profile
          </Link>
          <Button
            className="usermodal_btn"
            type="error"
            onClick={props.onClick}
          >
            Log out
          </Button>
        </section>
      </div>
  );
});

export default UserModal;
