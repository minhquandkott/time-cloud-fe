import "./CreateProjectForm.css";
import { reduxForm, Field } from "redux-form";
import React, { useState } from "react";
import SectionForm from "./sectionForm/SectionForm";
import TeamMembers from "./teamMembers/TeamMembers";
import TasksForm from "./tasksForm/TasksForm";

const renderInput = ({ input, meta, label, flexInput, ...attribute }) => {
  return (
    <div className="project_form_field">
      <label htmlFor={attribute.id}>{label}</label>
      <input {...attribute} {...input} style={{ flex: `${flexInput}` }} />
    </div>
  );
};

const renderProjectColor = (params) => {
  const { input, meta, label, flexInput, ...attribute } = params;
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

const tasks = [
  { id: 1, name: "task1" },
  { id: 2, name: "task2" },
  { id: 3, name: "task3" },
  { id: 4, name: "task4" },
  { id: 5, name: "task5" },
];
const CreateProjectForm = (props) => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);
  const [createdTasks, setCreatedTasks] = useState(tasks);
  return (
    <form
      className="create_project_form"
      onSubmit={(event) => event.preventDefault()}
    >
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
        <TeamMembers
          selectedManager={selectedManager}
          setSelectedManager={setSelectedManager}
          selectedMembers={selectedMembers}
          setSelectedMembers={setSelectedMembers}
        />
      </SectionForm>

      <SectionForm title="Tasks">
        <TasksForm
          selectedMembers={selectedMembers}
          selectedTasks={createdTasks}
          setSelectedTasks={setCreatedTasks}
        />
      </SectionForm>
    </form>
  );
};

export default reduxForm({
  form: "createProjectForm",
})(CreateProjectForm);
