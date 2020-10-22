import "./CreateProjectForm.css";
import React from "react";

const CreateProjectForm = ({ projectForm, setProjectForm }) => {
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
          onChange={(event) =>
            setProjectForm({ ...projectForm, projectName: event.target.value })
          }
        />
      </div>
      <div className="project_form_field">
        <label htmlFor="client-name">Client Name</label>
        <input
          id="client-name"
          placeholder="client name"
          type="text"
          style={{ flex: ".3" }}
          value={projectForm.clientName}
          onChange={(event) =>
            setProjectForm({ ...projectForm, clientName: event.target.value })
          }
        />
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
