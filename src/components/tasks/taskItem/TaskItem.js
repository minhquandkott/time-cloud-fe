import "./TaskItem.css";
import React from "react";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";

const TaskItem = ({ task }) => {
  return (
    <div className="task_item">
      <h3>Design</h3>
      <PlayCircleFilledWhiteIcon />
    </div>
  );
};

export default TaskItem;
