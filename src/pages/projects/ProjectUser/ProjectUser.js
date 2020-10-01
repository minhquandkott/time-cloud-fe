import React from "react";
import './ProjectUser.css';
import timeCloudAPI from "../../../apis/timeCloudAPI";
import CountUser from '../CountUser/CountUser';

class ProjectUser extends React.Component {

    state = {
        users: []
    };

    componentDidMount() {
        timeCloudAPI().get(`projects/${this.props.projectId}/user`)
        .then(res => {
            this.setState({
                users: res.data
            })
        })
    }

    render() {
        var {users} = this.state;
        return <div className="project_user__avatar"  style={{display: "flex", marginBottom: "0"}}>
            {
                users.map((ele, index) => <CountUser ele = {ele} amount = {users.length} index = {index} key={index} />)
            }
        </div>
        
      
    }
}

export default ProjectUser;