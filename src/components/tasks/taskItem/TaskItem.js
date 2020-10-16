import "./TaskItem.css";
import React from "react";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { connect } from "react-redux";
import {
  selectTask,
  beginCountingTime,
  endCountingTime,
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
  endCountingTime,
  increaseTime,
  selectedTask,
}) => {
  const startCount = () => {
    selectTask(task);
    localStorage.setItem(BEGIN_TIME, new Date().getTime());
    localStorage.setItem(SELECTED_TASK_ID, task.id);
    const intervalId = window.setInterval(() => {
      increaseTime(1);
    }, 1000);
    beginCountingTime(new Date().getTime(), intervalId);
  };

  const saveTime = () => {
    console.log("save");
  };
  const onButtonPlayClick = () => {
    if (!selectedTask) {
      startCount();
    } else {
      const chosen = window.confirm(
        "You have a time which has not saved yet! Do you want to save?"
      );
      if (!chosen) {
        endCountingTime();
        startCount();
      } else {
        saveTime();
      }
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
  const { selectedTask } = state.time;
  return {
    selectedTask,
  };
};

export default connect(mapStateToProps, {
  selectTask,
  beginCountingTime,
  increaseTime,
  endCountingTime,
})(TaskItem);
