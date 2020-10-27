import "./CreateProjectForm.css";
import React, { useState, useEffect } from "react";
import {
  require,
  validate,
  minLength6,
  maxLength15,
} from "../../../utils/validationUtils";
import ErrorIcon from "@material-ui/icons/Error";

const CreateProjectForm = ({
  projectForm,
  setProjectForm,
  error,
  setError,
}) => {
  const [touched, setTouched] = useState({
    projectName: false,
    clientName: false,
  });
  useEffect(() => {
    setError({
      projectName: validate(
        [require, minLength6, maxLength15],
        projectForm.projectName
      ),
      projectColor: validate([require], projectForm.projectColor),
      clientName: validate([require, maxLength15], projectForm.clientName),
    });
  }, [projectForm, setError]);

  return (
    <form
      className="create_project_form"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="project_form_field">
        <label htmlFor="project">Projects</label>
        <input
          id="project"
          placeholder="project name"
          type="text"
          style={{ flex: ".5" }}
          value={projectForm.projectName}
          onBlur={(e) => {
            if (!touched.projectName)
              setTouched({ ...touched, projectName: true });
          }}
          onChange={(event) => {
            setProjectForm({ ...projectForm, projectName: event.target.value });
          }}
        />
        {touched.projectName && error.projectName ? (
          <p className="create_project_form__error">
            <ErrorIcon />
            {error.projectName}
          </p>
        ) : null}
      </div>

      <div className="project_form_field">
        <label htmlFor="client-name">Client Name</label>
        <input
          id="client-name"
          placeholder="client name"
          type="text"
          style={{ flex: ".3" }}
          value={projectForm.clientName}
          onBlur={(e) => {
            if (!touched.clientName)
              setTouched({ ...touched, clientName: true });
          }}
          onChange={(event) =>
            setProjectForm({ ...projectForm, clientName: event.target.value })
          }
        />
        {touched.clientName && error.clientName ? (
          <p className="create_project_form__error">
            <ErrorIcon />
            {error.clientName}
          </p>
        ) : null}
      </div>

      <div className="project_form_field project_form_field__color">
        <label>Background Color</label>
        <div style={{ flex: ".6" }}>
          <h4>Choose color ....</h4>
          <p>
            Each project will have a specific color that will help you team
            members recognize supper easily.
          </p>
        </div>
        <input
          type="color"
          value={projectForm.projectColor}
          onChange={(event) =>
            setProjectForm({ ...projectForm, projectColor: event.target.value })
          }
        />
      </div>
    </form>
  );
};

export default CreateProjectForm;
