import "./LeftSign.css";
import React from "react";
import Logo from "../../logo/Logo";

const LeftSign = (props) => {
  return (
    <React.Fragment>
      <Logo />
      {props.children}
    </React.Fragment>
  );
};

export default LeftSign;
