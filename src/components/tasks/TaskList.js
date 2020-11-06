import React from "react";
import "./TaskList.css";

import TaskItem from "./taskItem/TaskItem";
class TaskList extends React.Component {
  renderTaskList() {
    return this.props.tasks.map((task) => {
      return <TaskItem task={task} key={task.id} />;
    });
  }
  render() {
    return <div className="task_list">{this.renderTaskList()}</div>;
  }
}

export default TaskList;
