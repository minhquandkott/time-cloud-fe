import React from "react";
import "./ShowUsers.css";
import timeCloudAPI from "../../../../apis/timeCloudAPI";
import UserInfo from "../../../../components/userInfo/UserInfo";
import UserTracked from "./userTracked/UserTracked";
import TaskTrackedByUser from "./taskTrackedByUser/TaskTrackedByUser";
import male from "../../../../assets/images/male.png";
import female from "../../../../assets/images/female.png";
import ProjectDetailFlag from "../../projectDetailFlag/ProjectDetailFlag";
import Axios from "axios";

class ShowUsers extends React.Component {
  state = {
    tasks: [],
  };

  source = Axios.CancelToken.source();

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    if (this.props.isDoing) {
      // * fetch all in currentTasks(isDoing = true)
      timeCloudAPI()
        .get(
          `projects/${this.props.project.id}/users/${this.props.user.id}/tasks`,
          {
            cancelToken: this.source.token,
          }
        )
        .then((response) => {
          this.setState({
            tasks: response.data,
          });
        });
    } else {
      // * fetch all in oldProject(isDoing = false)
      Promise.all(
        this.props.unavailableTasks.map((ele) =>
          timeCloudAPI().get(`tasks/${ele}`, {
            cancelToken: this.source.token,
          })
        )
      ).then((res) => {
        this.setState({
          tasks: res.map((ele) => ele.data),
        });
      });
    }
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  render() {
    var { tasks } = this.state;
    var { user, project } = this.props;
    return (
      <div className="show_users">
        <div className="show_users__item">
          <div className="show_users__name" style={{ marginBottom: "0" }}>
            <UserInfo
              avatar={user?.avatar ? user.avatar : user?.gender ? male : female}
              cssForPrimaryInfo={{ fontWeight: "500" }}
              primaryInfo={user.name}
              secondaryInfo={user.email}
              flag={this.props.isDoing || <ProjectDetailFlag />}
            />
          </div>
          <div className="show_users__tracked">
            <UserTracked projectId={project.id} user={user} />
          </div>
        </div>
        <div className="toggle_item reverse amount_tasks">
          {`${tasks.length} tasks`}
        </div>
        <div className="toggle_item">
          {tasks
            .sort((task1, task2) => (task1.name <= task2.name ? -1 : 1))
            .map((task) => {
              return (
                <div key={task.id} className="list_tasks">
                  <div className="list_tasks__name">{task.name}</div>
                  <TaskTrackedByUser userId={user.id} taskId={task.id} />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
export default ShowUsers;
