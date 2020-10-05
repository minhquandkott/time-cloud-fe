import React from "react";
import "./Tab.css";

const Tab = ({ children, isSelectedTab }) => {
  return (
    <div className={isSelectedTab ? "tab animation" : "tab"}>
      {isSelectedTab ? children : null}
    </div>
  );
};
export default Tab;
