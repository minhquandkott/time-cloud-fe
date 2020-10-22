import React from 'react';
import Collapse from "../../../components/collapse/Collapse";
import timeCloudAPI from '../../../apis/timeCloudAPI';
import ViewUsersByTask from './viewUsersByTask/ViewUsersByTask';
import "./ProjectDetailTask.css";
class ProjectDetailTask extends React.Component {
    state = {
        tasks: []
    }

    _isMounted = false;

    componentDidMount = () => {    
        this._isMounted = true;
        timeCloudAPI().get(`projects/${this.props.project.id}/tasks`)
        .then(response => {
            if(this._isMounted) {
                this.setState({
                    tasks: response.data
                })
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        
        return (
            <div className="project_detail_task">
                <table style={{width:"100%"}}>
                    <thead>
                        <tr>
                            <th >Task</th>
                            <th >Tracked (h)</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <Collapse>
                    {this.state.tasks.sort((task1,task2)=>(task1.name<=task2.name?-1:1)).map((task) => {
                        return (
                            <ViewUsersByTask task = {task} key={task.id}/> 
                        )
                    })}
                </Collapse>
                
            </div>
        )
    }
}



export default ProjectDetailTask