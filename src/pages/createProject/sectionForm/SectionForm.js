import "./SectionForm.css";
import React from "react";

const SectionForm = ({ title, children }) => {
  return (
    <div className="section_form">
      <div className="section_form__header">
        <h2>{title}</h2>
      </div>
      <div className="section_form__content">{children}</div>
    </div>
  );
};

export default SectionForm;
