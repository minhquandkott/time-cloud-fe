import React from "react";
import "./ProjectUser.css";
import CountUser from "../CountUser/CountUser";

class ProjectUser extends React.Component {
  render() {
    var { users, rowStatus } = this.props;
    return (
      <div
        className="project_user__avatar"
        style={{ display: rowStatus ? "flex" : "", marginBottom: "0" }}
      >
        {users.map((ele, index) => {
          if (rowStatus) {
            return index < 3 ? (
              <CountUser
                ele={ele}
                amount={users.length}
                index={index}
                key={index}
                rowStatus={rowStatus}
              />
            ) : null;
          } else {
            return (
              <CountUser
                rowStatus={rowStatus}
                ele={ele}
                amount={users.length}
                index={index}
                key={index}
              />
            );
          }
        })}
      </div>
    );
  }
}

export default ProjectUser;
