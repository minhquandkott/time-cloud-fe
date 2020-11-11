import React, {Component} from 'react';
import './ProjectItem.css';

class ProjectItem extends Component {
    render() {
        const {project} = this.props;
        console.log(project);
        return (
            <button> ABC </button>

        )
    }
}

export default ProjectItem;