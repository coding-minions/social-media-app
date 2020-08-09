import React from "react";

import "./LoaderComponent.css";

export const LoaderComponent = () => {
  return (
    <div className="loading mt-5">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
