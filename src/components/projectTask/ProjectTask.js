import "./ProjectTask.css";
import React from "react";
import Point from "../point/Point";

const ProjectTask = ({ projectName, taskName, projectColor }) => {
  return (
    <div className="project_task">
      <Point color={projectColor} pointSize="20" title={projectName} />
      <Point color="#DDDDDD" pointSize="7" title={taskName} />
    </div>
  );
};

export default ProjectTask;
