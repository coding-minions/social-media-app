import React from "react";
import Toast from "react-bootstrap/Toast";

export const ToasterComponent = props => {
  return (
    <>
      <Toast
        className={props.class}
        style={{ position: "absolute", top: "5%", right: "5%" }}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong>{props.heading}</strong>
        </Toast.Header>
        <Toast.Body>{props.msg}</Toast.Body>
      </Toast>
    </>
  );
};
