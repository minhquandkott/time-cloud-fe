import React from "react";
import "./ViewUsersByTask.css";
import timeCloudAPI from "../../../../apis/timeCloudAPI";
import ProjectUser from "../../../../pages/companyProjects/ProjectUser/ProjectUser";
import TaskTracked from "./taskTracked/TaskTracked";

class ViewUsersByTask extends React.Component {
    state = {
        users: []
    }

    _isMounted = false;

    componentDidMount(){
        this._isMounted = true;
        timeCloudAPI().get(`tasks/${this.props.task.id}/users`)
        .then(response => {
            if(this._isMounted) {
                this.setState({
                    users: response.data
                })
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    render() {
        const usersFake = [{id :1 , gender: false,name : "" }] 
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
                    <ProjectUser taskId = {task.id} users = {users.length === 0 ? usersFake : users} rowStatus = {true} />
                </div>
                <div className="toggle_item"><ProjectUser taskId = {task.id} users = {users} rowStatus = {false} /></div>
            </div>
        )
    }
}
export default ViewUsersByTask;
