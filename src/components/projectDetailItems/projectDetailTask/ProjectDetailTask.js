import React from "react";
import Collapse from "../../../components/collapse/Collapse";
import timeCloudAPI from "../../../apis/timeCloudAPI";
import ViewUsersByTask from "./viewUsersByTask/ViewUsersByTask";
import "./ProjectDetailTask.css";
import Axios from "axios";
class ProjectDetailTask extends React.Component {
  state = {
    tasks: [],
  };
  source = Axios.CancelToken.source();

  fetchTasks = async () => {
    try {
      let res = await timeCloudAPI().get(
        `projects/${this.props.project.id}/tasks`,
        { cancelToken: this.source.token }
      );
      const tasks = res.data;
      this.setState({
        tasks,
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = () => {
    this.fetchTasks();
  };

  componentWillUnmount() {
    this.source.cancel();
  }

  getUnavailableUser = (taskId) => {
    const { unavailableUsers } = this.props;
    const temp = unavailableUsers.filter((ele) =>
      ele.tasks?.some((e) => e === taskId)
    );
    return temp.map((ele) => ele.user);
  };

  render() {
    return (
      <div className="project_detail_task">
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Task</th>
              <th>Tracked (h)</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        <Collapse>
          {this.state.tasks.map((task) => {
            return (
              <ViewUsersByTask
                task={task}
                key={task.id}
                oldUsers={this.getUnavailableUser(task.id)?.map((ele) => {
                  return { ...ele, isDoing: false };
                })}
              />
            );
          })}
        </Collapse>
      </div>
    );
  }
}

export default ProjectDetailTask;
