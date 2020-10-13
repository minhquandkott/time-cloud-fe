import "./SectionForm.css";
import React from "react";
import { FormSection } from "redux-form";

const SectionForm = ({ title, children }) => {
  return (
    <FormSection name={title}>
      <div className="section_form__header">
        <h2>{title}</h2>
      </div>
      <div className="section_form__content">{children}</div>
    </FormSection>
  );
};

export default SectionForm;
