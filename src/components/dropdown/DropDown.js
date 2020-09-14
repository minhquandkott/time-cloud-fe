import "./DropDown.css";

import React from "react";

const DropDown = (props) => {
  return (
    <div className="drop_down">
      <p className="drop_down__title">{props.title}</p>
      <br />
      {props.children}
    </div>
  );
};

export default DropDown;
