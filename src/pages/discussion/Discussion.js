import React, {Component} from 'react';
import Interact from '../../components/interact/Interact';
import Content from './content/Content';
import Avatar from '../../components/avatar/Avatar';
import male from '../../assets/images/male.png';
import timeCloudAPI from '../../apis/timeCloudAPI';
import ProjectItem from './projectItem/ProjectItem';
import './Discussion.css';

class Discussion extends Component {

    state = {
        projects: [],
    }

    componentDidMount() {
        timeCloudAPI().get(`users/${localStorage.getItem("userId")}/projects-available`)
        .then(res => {
            this.setState({
                projects: res.data
            })
        })
    }

    render() {
        const {projects} = this.state;
        return(
            <div className="discussion">
                <div className="discussion__header">
                    {
                        projects.map((project, index) =>(
                            <ProjectItem project={project} />
                        ))
                    }
                </div>
                {/* <div className="discussion__left">
                    <div className="discussion__list">
                        <div className="discussion__item">
                            <Interact />
                            <Content />
                        </div>
                        <div className="discussion__item">
                            <Interact />
                            <Content />
                        </div>
                        <div className="discussion__item">
                            <Interact />
                            <Content />
                        </div>
                        <div className="discussion__item">
                            <Interact />
                            <Content />
                        </div>
                        
                    </div>
                    <div className="discussion__write">
                        <Avatar avatar={male} avatarSize="3.5rem" />
                        <input type="text" placeholder="Write discussion..." />
                    </div>
                </div>
                <div className="discussion__feature">
                    This is feature
                </div> */}
            </div>
        )
    }
}

export default Discussion;