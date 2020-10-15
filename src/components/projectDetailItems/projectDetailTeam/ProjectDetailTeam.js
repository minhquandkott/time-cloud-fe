import React from "react";
import Collapse from "../../../components/collapse/Collapse";
import timeCloudAPI from "../../../apis/timeCloudAPI";
import ShowUser from "./showUsers/ShowUsers";
import "./ProjectDetailTeam.css";
import male from "../../../assets/images/male.png";
import female from "../../../assets/images/female.png";

class ProjectDetailTeam extends React.Component {
  state = {
    users: [],
  };

  componentDidMount() {
    timeCloudAPI()
      .get(`projects/${this.props.project.id}/users`)
      .then((response) => {
        this.setState({
          users: response.data,
        });
      });
  }

<<<<<<< HEAD
    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        timeCloudAPI().get(`projects/${this.props.project.id}/users`)
        .then(response => {
            if(this._isMounted) {
                this.setState({
                    users: response.data
                })
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {
        var {project} = this.props;
        return (
            <div className="project_detail_team">
                <table style={{width:"100%"}}>
                    <thead>
                        <tr>
                            <th >Member</th>
                            <th >Tracked (h)</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <Collapse>
                    {this.state.users.map((user, index) => {
                        return (
                            <ShowUser project= {project} avatar = {user.gender ? male : female} user = {user} index={index} key={user.id}/> 
                        )
                    })}
                </Collapse>
                
            </div>
        )
    }
} 

export default ProjectDetailTeam
=======
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
          {this.state.users.map((user, index) => {
            return (
              <ShowUser
                avatar={user.gender ? male : female}
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
>>>>>>> develop
