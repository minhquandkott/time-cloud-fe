import React from "react";
import "./ProjectItem.css";

const ProjectItem = ({
  project,
  index,
  onDragStartHandler,
  onDragEndHandler,
  children,
}) => {
  const style = { backgroundColor: `${project.color}` };

  return (
    <div className="project_item " style={style}>
      <div
        className=" project_header__drag_item"
        draggable={true}
        onDragStart={(event) => onDragStartHandler(event, index)}
        onDragEnd={onDragEndHandler}
      >
        <h3>{project.company.name}</h3>
        <h2>{project.name}</h2>
      </div>

      <div className="project_item__info">{children}</div>
    </div>
  );
};

export default ProjectItem;
