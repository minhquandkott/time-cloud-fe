import "./TaskItem.css";
import React from "react";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";

class TaskItem extends React.Component {
  componentDidMount() {
    this.props.fetchTasks();
  }
  render() {
    return (
      <div className="task_item">
        <h3>Design</h3>
        <PlayCircleFilledWhiteIcon />
      </div>
    );
  }
}

export default TaskItem;
