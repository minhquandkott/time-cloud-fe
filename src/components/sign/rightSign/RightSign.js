import "./RightSign.css";
import React from "react";

const RightSign = ({ header, title, children }) => {
  return (
    <React.Fragment>
      <div className="right_sign__header">
        <p>{header?.p}</p>
        <button>{header?.button}</button>
      </div>
      <div className="right_sign__title">
        <h3>{title?.h3}</h3>
        <p>{title?.p}</p>
      </div>
      <div className="right_sign__form">{children}</div>
    </React.Fragment>
  );
};

export default RightSign;
