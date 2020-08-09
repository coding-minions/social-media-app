import React from "react";
import { useToasts } from "react-toast-notifications";
import { toast, ToastContainer } from "react-toastify";

export const ToasterComponent = props => {
  if (props.error) {
    toast.error(props.msg, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    });
  } else if (props.success) {
    toast.success(props.msg, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    });
  }
  return (
    <>
      <ToastContainer />
    </>
  );
};
