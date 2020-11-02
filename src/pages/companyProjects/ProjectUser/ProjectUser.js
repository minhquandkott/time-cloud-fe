import React from "react";
import "./ProjectUser.css";
import CountUser from "../CountUser/CountUser";
import { v4 } from "uuid";

class ProjectUser extends React.Component {
  render() {
    var { users, rowStatus, taskId, renderFlag } = this.props;
    return (
      <div
        className="project_user__avatar"
        style={{ display: rowStatus ? "flex" : "", marginBottom: "0" }}
      >
        {users.map((ele, index) => {
          if (rowStatus) {
            return index < 4 ? (
              <CountUser
                taskId={taskId}
                ele={ele}
                amount={users.length}
                index={index}
                key={v4()}
                rowStatus={rowStatus}
              />
            ) : null;
          } else {
            return (
              <CountUser
                taskId={taskId}
                rowStatus={rowStatus}
                ele={ele}
                amount={users.length}
                index={index}
                key={v4()}
                renderFlag={renderFlag}
              />
            );
          }
        })}
      </div>
    );
  }
}

export default ProjectUser;
