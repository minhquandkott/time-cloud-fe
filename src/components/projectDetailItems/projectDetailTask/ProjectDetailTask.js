import React from 'react';
import Collapse from "../../../components/collapse/Collapse";
import timeCloudAPI from '../../../apis/timeCloudAPI';
import ViewUsersByTask from './viewUsersByTask/ViewUsersByTask';
import "./ProjectDetailTask.css";
class ProjectDetailTask extends React.Component {
    state = {
        tasks: []
    }
    componentDidMount = () => {    
        timeCloudAPI().get(`projects/${this.props.project.id}/tasks`)
        .then(response => {
            this.setState({
                tasks: response.data
            })
        });
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
                    {this.state.tasks.map((task, index) => {
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