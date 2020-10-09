import React from "react";
import timeCloudAPI from '../../../apis/timeCloudAPI';
import ProjectUser from './ProjectUser';

class UserColumn extends React.Component {

    state = {
        users: []
    }

    componentDidMount() {
        timeCloudAPI().get(`projects/${this.props.project.id}/users`)
        .then(response => {
            this.setState({
                users: response.data
            })
        })
    }

    render() {
        return (
            <ProjectUser users = {this.state.users} rowStatus = {true} />
        )
    }

}

export default UserColumn;