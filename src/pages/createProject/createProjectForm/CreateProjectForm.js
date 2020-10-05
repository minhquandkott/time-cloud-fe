import "./CreateProjectForm.css";
import { reduxForm, Field } from "redux-form";
import React from "react";
import SectionForm from "./sectionForm/SectionForm";
import Table from "../../../components/table/Table";

const columns = {
  action: {
    key: "action",
    width: "5%",
    convertData: (element) => {
      return <button></button>;
    },
    cssData: {
      textAlign: "center",
    },
  },
  name: {
    key: "name",
    label: "name",
    width: "20%",

    cssData: {
      textTransform: "capitalize",
    },
    convertData: (userRole) => userRole.user.name,
  },
  email: {
    key: "email",
    label: "email",
    width: "35%",
  },
  access: {
    key: "access",
    label: "access",
    width: "40%",
  },
};

const CreateProjectForm = () => {
  const renderInput = ({ input, meta, label, flexInput, ...attribute }) => {
    return (
      <div className="project_form_field">
        <label htmlFor={attribute.id}>{label}</label>
        <input {...attribute} {...input} style={{ flex: `${flexInput}` }} />
      </div>
    );
  };

  const renderProjectColor = ({
    input,
    meta,
    label,
    flexInput,
    ...attribute
  }) => {
    console.log(input, meta, label, attribute);
    return (
      <div className="project_form_field project_form_field__color">
        <label>{label}</label>
        <div style={{ flex: `${flexInput}` }}>
          <h4>Choose color ....</h4>
          <p>
            Each project will have a specific color that will help you team
            members recognize supper easily.
          </p>
        </div>
        <input {...attribute} {...input} />
      </div>
    );
  };
  return (
    <form className="create_project_form">
      <SectionForm title="General Information">
        <Field
          name="project_name"
          label="Project"
          placeholder="project name"
          component={renderInput}
          id="project"
          type="text"
          flexInput=".5"
        />
        <Field
          name="client_name"
          placeholder="client name "
          component={renderInput}
          type="text"
          flexInput=".3"
        />
        <Field
          name="project_color"
          label="Background Color"
          component={renderProjectColor}
          type="color"
          flexInput=".6"
        />
      </SectionForm>
      <SectionForm title="Team Members">
        <Table skeletonLoading={false} />
      </SectionForm>
    </form>
  );
};

export default reduxForm({
  form: "createProjectForm",
})(CreateProjectForm);
