import React from "react";
import "./ProjectItem.css";

const ProjectItem = (props) => {
  const { project } = props;
  console.log(project);
  return (
    <div className="project_item">
      <div className="project_item__header">
        <h3>{project.company.name}</h3>
        <h2>{project.name}</h2>
      </div>
      <div className="project_item__info">{props.children}</div>
    </div>
  );
};

export default ProjectItem;
