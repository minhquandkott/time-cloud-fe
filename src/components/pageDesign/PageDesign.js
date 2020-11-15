import "./PageDesign.css";
import React from "react";

const PageDesign = ({ title, headerRight, children, css }) => {
  return (
    <div className="page_design" style={{ ...css }}>
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
