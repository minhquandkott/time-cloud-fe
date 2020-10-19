import "./PageDesign.css";
import React from "react";

const PageDesign = ({ title, headerRight, children }) => {
  return (
    <div className="page_design">
      <div className="page_design__header">
        <div className="page_design__header__left">
          <h2>{title}</h2>
        </div>
        <div className="page_design__header__right">{headerRight}</div>
      </div>
      <div className="page_design__content">{children}</div>
    </div>
  );
};

export default PageDesign;
