import "./ListProjectTask.css";
import { connect } from "react-redux";
import React from "react";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const ListProjectTask = ({
  projects,
  onClickTaskHandler,
  renderFlagTask = () => {},
}) => {
  return (
    <div className="list_project_task" onClick={(e) => e.stopPropagation()}>
      {projects.map((project) => {
        return (
          <div className="list_project_task__item" key={project.id}>
            <div className="list_project_task__project">
              <FiberManualRecordIcon style={{ color: project.color }} />
              <span>{project.name}</span>
              <span>({project.company.name})</span>
            </div>
            <div className="list_project_task__tasks">
              {project.tasks.map((task) => {
                return (
                  <div className="list_project_task__task_item" key={task.id}>
                    <p onClick={() => onClickTaskHandler(task)}>{task.name}</p>
                    {renderFlagTask(task)}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default connect()(ListProjectTask);
