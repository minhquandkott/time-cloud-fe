import React from "react";
import timeCloudAPI from "../../../apis/timeCloudAPI";
import ProjectUser from "./ProjectUser";

class UserColumn extends React.Component {
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
    return (
      <ProjectUser
        users={this.state.projectUsers
          .map((ele) => ele.user)
        }
        rowStatus={true}
      />
    );
  }
}

export default UserColumn;
