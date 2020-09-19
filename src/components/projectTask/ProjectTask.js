import "./ProjectTask.css";
import React from "react";
import Point from "../point/Point";

const ProjectTask = (props) => {
  const { projectName, taskName } = props;
  return (
    <div className="project_task">
      <Point color="D65108" pointSize="20" title={projectName} />
      <Point color="DDDDDD" pointSize="7" title={taskName} />
    </div>
  );
};

export default ProjectTask;
