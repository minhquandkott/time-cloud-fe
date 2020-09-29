import "./DropDown.css";

import React from "react";

const DropDown = (props) => {
  return (
    <div className="drop_down">
      {props.title ? (
        <React.Fragment>
          <p className="drop_down__title">{props.title}</p>
          <br />
        </React.Fragment>
      ) : null}

      {props.children}
    </div>
  );
};

export default DropDown;
