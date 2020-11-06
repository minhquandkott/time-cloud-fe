import "./TaskItem.css";
import React from "react";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { connect } from "react-redux";
import {
  selectTask,
  beginCountingTime,
  increaseTime,
} from "../../../redux/actions";
import {
  BEGIN_TIME,
  SELECTED_TASK_ID,
} from "../../../utils/localStorageContact";

const TaskItem = ({
  task,
  title,
  children,
  selectTask,
  beginCountingTime,
  increaseTime,
  isCounting,
}) => {
  const startCount = () => {
    const now = new Date();
    selectTask(task);
    localStorage.setItem(BEGIN_TIME, now);
    localStorage.setItem(SELECTED_TASK_ID, task.id);
    const intervalId = window.setInterval(() => {
      increaseTime(1);
    }, 1000);
    beginCountingTime(now, intervalId);
  };

  const onButtonPlayClick = () => {
    if (isCounting) {
      selectTask(task);
    } else {
      startCount();
    }
  };

  return (
    <div className="task_item">
      <h3>{title ? title : task.name}</h3>
      {children}
      <button onClick={onButtonPlayClick}>
        <PlayCircleFilledWhiteIcon />
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { isCounting } = state.time;
  return {
    isCounting,
  };
};

export default connect(mapStateToProps, {
  selectTask,
  beginCountingTime,
  increaseTime,
})(TaskItem);
