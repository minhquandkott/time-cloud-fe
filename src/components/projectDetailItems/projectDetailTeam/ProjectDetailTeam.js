import React from "react";
import Collapse from "../../../components/collapse/Collapse";
import timeCloudAPI from "../../../apis/timeCloudAPI";
import ShowUser from "./showUsers/ShowUsers";
import { v4 } from "uuid";
import "./ProjectDetailTeam.css";

class ProjectDetailTeam extends React.Component {
  state = {
    projectUsers: [],
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    timeCloudAPI()
      .get(`projects/${this.props.project.id}/users`)
      .then((response) => {
        if (this._isMounted) {
          this.setState({
            projectUsers: response.data,
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    var { project } = this.props;
    var { projectUsers } = this.state;
    return (
      <div className="project_detail_team">
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Member</th>
              <th>Tracked (h)</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        <Collapse>
          {projectUsers
            .sort((user1, user2) =>
              user1.user.name <= user2.user.name ? -1 : 1
            )
            .map((projectUser, index) => {
              return (
                <ShowUser
                  project={project}
                  user={projectUser.user}
                  index={index}
                  key={v4()}
                />
              );
            })}
        </Collapse>
      </div>
    );
  }
}

export default ProjectDetailTeam;
