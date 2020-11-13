import React, {Component} from 'react';
import './ProjectName.css';

class ProjectName extends Component {
    render() {
        const {project} = this.props;
        return (
            <span className="project_name" style={{backgroundColor: project.color}}> {project.name} </span>
        )
    }
}

export default ProjectName;