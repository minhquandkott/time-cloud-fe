import "./TaskItem.css";
import React from "react";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { connect } from "react-redux";
import { selectTask } from "../../../redux/actions";

const TaskItem = (props) => {
  const onButtonPlayClick = () => {
    props.selectTask(props.task);
  };

  return (
    <div className="task_item">
      <h3>{props.task.name}</h3>
      <button onClick={onButtonPlayClick}>
        {props.children}
        <PlayCircleFilledWhiteIcon />
      </button>
    </div>
  );
};

export default connect(null, {
  selectTask,
})(TaskItem);
