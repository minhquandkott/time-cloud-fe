import React from "react";
import "./TaskList.css";
import { connect } from "react-redux";
import { fetchTasks } from "../../redux/actions";
import TaskItem from "./taskItem/TaskItem";
class TaskList extends React.Component {
  componentDidMount() {
    this.props.fetchTasks(this.props.projectId);
  }

  renderTaskList() {
    return this.props.tasks.map((task) => {
      return <TaskItem task={task} key={task.id} />;
    });
  }
  render() {
    return <div className="task_list">{this.renderTaskList()}</div>;
  }
}

const mapStateToProps = (state, props) => {
  return {
    tasks: state.tasks.tasks.filter(
      (task) => task.project.id === props.projectId
    ),
  };
};

export default connect(mapStateToProps, {
  fetchTasks,
})(TaskList);
