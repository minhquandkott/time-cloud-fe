import React from "react";
import "./ShowUsers.css";
import timeCloudAPI from "../../../../apis/timeCloudAPI";
import UserInfo from "../../../../components/userInfo/UserInfo";
import UserTracked from "./userTracked/UserTracked";
import TaskTrackedByUser from "./taskTrackedByUser/TaskTrackedByUser";
import male from "../../../../assets/images/male.png";
import female from "../../../../assets/images/female.png";

class ShowUsers extends React.Component {
  state = {
    tasks: [],
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    timeCloudAPI()
      .get(
        `projects/${this.props.project.id}/users/${this.props.user.id}/tasks`
      )
      .then((response) => {
        if (this._isMounted) {
          this.setState({
            tasks: response.data,
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
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
