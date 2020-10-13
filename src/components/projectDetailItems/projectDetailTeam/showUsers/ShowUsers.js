import React from "react";
import "./ShowUsers.css";
import timeCloudAPI from "../../../../apis/timeCloudAPI";
import CountUser from "../../../../pages/companyProjects/CountUser/CountUser";
import UserInfo from "../../../../components/userInfo/UserInfo";
import UserTracked from "./userTracked/UserTracked";

class ShowUsers extends React.Component {
  state = {
    tasks: [],
  };
  componentDidMount() {
    timeCloudAPI()
      .get(`users/${this.props.user.id}/tasks`)
      .then((response) => {
        this.setState({
          tasks: response.data,
        });
      });
  }

  render() {
    var { tasks } = this.state;
    var { user, index, avatar } = this.props;
    return (
      <div className="show_users">
        <div className="show_users__item">
          <div className="show_users__name" style={{ marginBottom: "0" }}>
            <UserInfo
              avatar={avatar}
              cssForPrimaryInfo={{ fontWeight: "500" }}
              primaryInfo={user.name}
              secondaryInfo={user.email}
            />
          </div>
          <div className="show_users__tracked">
            <UserTracked user={user} />
          </div>
        </div>
        <div className="toggle_item reverse amount_tasks">
          {`${tasks.length} tasks`}
        </div>
        <div className="toggle_item">
          {tasks.map((task) => {
            return <div className="list_tasks">{task.name}</div>;
          })}
        </div>
      </div>
    );
  }
}
export default ShowUsers;
