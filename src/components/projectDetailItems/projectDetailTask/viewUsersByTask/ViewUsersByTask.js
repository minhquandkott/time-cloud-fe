import React from 'react';
import "./ViewUsersByTask.css";
import timeCloudAPI from '../../../../apis/timeCloudAPI';
import ProjectUser from '../../../../pages/companyProjects/ProjectUser/ProjectUser';
import TaskTracked from './taskTracked/TaskTracked';

class ViewUsersByTask extends React.Component {
    state = {
        users: []
    }
    componentDidMount(){
        timeCloudAPI().get(`tasks/${this.props.task.id}/users`)
        .then(response => {
            this.setState({
                users: response.data
            })
        });
    }
    
    render() {
        var {task} = this.props;
        var {users} = this.state;
        return (
            <div className="view_user_by_task">
                <div className="view_user_by_task__item">
                    <div className = "view_user_by_task__name">
                        {task.name}
                    </div>
                    <div className="view_user_by_task__tracked">
                        <TaskTracked taskId = {task.id}/>
                    </div>
                </div>
                <div className = "toggle_item reverse">
                    <ProjectUser users = {users} rowStatus = {true} />
                </div>
                <div className="toggle_item"><ProjectUser users = {users} rowStatus = {false} /></div>
            </div>
        )
    }
}
export default ViewUsersByTask;