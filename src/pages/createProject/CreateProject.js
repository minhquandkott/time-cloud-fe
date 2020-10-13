import "./CreateProject.css";
import React, { useState } from "react";
import CreateProjectForm from "./createProjectForm/CreateProjectForm";
import SectionForm from "./sectionForm/SectionForm";
import TeamMembers from "./teamMembers/TeamMembers";
import TasksForm from "./tasksForm/TasksForm";
import { connect } from "react-redux";
import timeCloudAPI from "../../apis/timeCloudAPI";
import history from "../../history";
import Spinner from "../../components/loading/spinner/Spinner";

const CreateProject = ({ formValues }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);
  const [createdTasks, setCreatedTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const onCreateProject = async () => {
    setIsSaving(true);
    try {
      const { project_name, client_name, project_color } = formValues;
      const {
        data: { id },
      } = await timeCloudAPI().post("companies/52/projects", {
        color: project_color,
        clientName: client_name,
        name: project_name,
      });
      const res = await Promise.allSettled([
        ...selectedMembers.map((ele) =>
          timeCloudAPI().post(`projects/${id}/users/${ele.id}`)
        ),
        ...createdTasks.map((task) => saveTaskAndTaskMembers(task, id)),
      ]);
      history.push("/timer");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const checkFormEmpty = () => {
    if (formValues) {
      const { project_name, client_name, project_color } = formValues;
      return !(project_color && client_name && project_name);
    }
    return true;
  };

  const saveTaskAndTaskMembers = async (task, projectId) => {
    const res = await timeCloudAPI().post(`projects/${projectId}/tasks`, {
      name: task.name,
    });
    const taskId = res.data.id;
    if (task.users) {
      task.users.forEach((user) =>
        timeCloudAPI().post(`tasks/${taskId}/users/${user.id}`)
      );
      timeCloudAPI().post(
        `tasks/${taskId}/users/${localStorage.getItem("userId")}`
      );
    }
  };

  const onCancelProject = () => {
    window.confirm("Are you sure ?")
      ? history.push("/timer")
      : console.log("ok");
  };
  return (
    <div className="create_project">
      <SectionForm title="General Information">
        <CreateProjectForm />
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
      <div className="create_project__bottom">
        <div className="create_project__spinner">
          {isSaving ? <Spinner /> : null}
        </div>
        <div className="create_project__button">
          {!isSaving ? (
            <button
              className="create_project__button__cancel"
              onClick={onCancelProject}
            >
              Cancel
            </button>
          ) : null}
          <button
            className="create_project__button__create_new"
            onClick={onCreateProject}
            disabled={checkFormEmpty()}
          >
            Create New
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    formValues: state.form.createProjectForm?.values,
  };
};

export default connect(mapStateToProps)(CreateProject);
