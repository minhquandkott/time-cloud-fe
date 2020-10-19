import React from "react";
import Collapse from "../../../components/collapse/Collapse";
import timeCloudAPI from "../../../apis/timeCloudAPI";
import ShowUser from "./showUsers/ShowUsers";
import "./ProjectDetailTeam.css";


class ProjectDetailTeam extends React.Component {
  state = {
    users: [],
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    timeCloudAPI()
      .get(`projects/${this.props.project.id}/users`)
      .then((response) => {
        if (this._isMounted) {
          this.setState({
            users: response.data,
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    var { project } = this.props;
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
          {this.state.users.sort((user1,user2)=>(user1.name<=user2.name?-1:1)).map((user, index) => {
            return (
              <ShowUser
                project={project}
                user={user}
                index={index}
                key={user.id}
              />
            );
          })}
        </Collapse>
      </div>
    );
  }
}

export default ProjectDetailTeam;
