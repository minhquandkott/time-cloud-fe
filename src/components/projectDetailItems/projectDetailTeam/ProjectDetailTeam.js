import React from 'react';
import Collapse from "../../../components/collapse/Collapse";
import timeCloudAPI from '../../../apis/timeCloudAPI';
import ShowUser from './showUsers/ShowUsers';
import './ProjectDetailTeam.css';

class ProjectDetailTeam extends React.Component {

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
                            <ShowUser user = {user} index={index} key={user.id}/> 
                        )
                    })}
                </Collapse>
                
            </div>
        )
    }
} 

export default ProjectDetailTeam