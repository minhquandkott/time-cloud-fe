import React from "react";
import "./ProjectDetail.css";
import { connect } from "react-redux";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { deleteProjects, fetchTasks, getUser } from "../../redux/actions";
import history from "../../history";
import TrackTime from '../companyProjects/TrackTime/TrackTime';
import MenuProjectDetail from './../companyProjects/menuProjectDetail/MenuProjectDetail';
import {randomColorArray, randomNumber} from '../../utils/Utils';
import ProjectDetailTask from '../../components/projectDetailItems/projectDetailTask/ProjectDetailTask';
import ProjectDetailTeam from '../../components/projectDetailItems/projectDetailTeam/ProjectDetailTeam';
import ProjectDetailDiscussion from '../../components/projectDetailItems/projectDetailDiscussion/ProjectDetailDiscussion';

const routes = [
  {
    path : '/projects/:id/task',
    exact: true,
    main : ({match, location}) => <ProjectDetailTask match ={match} location = {location} />
  },
  {
    path : '/projects/:id/team',
    exact: true,
    main : ({match, location}) => <ProjectDetailTeam match ={match} location = {location} />
  },
  {
    path : '/projects/:id/discussion',
    exact: true,
    main : ({match, location}) => <ProjectDetailDiscussion match ={match} location = {location} />
  }
]

class Projects extends React.Component {
 
  showRoute = (routes) => {
    var result = null;
    result = routes.map((item, index) => {
        return (
            <Route key = {index} path = {item.path} exact = {item.exact} component = {item.main} />
        )
    });
    return result;
}

  componentDidMount = () => {
    var userId = history.location.state.project.element.createdBy;
    this.props.getUser(userId);
  }

  render() {
      var project = history.location.state.project.element;
      var createAt = new Date(project.createAt);
      createAt = createAt.toLocaleDateString();
      var createdBy = this.props.user?.name ? this.props.user.name : '';
    return (
      <Router>
        <div className = "project_detail">
          <div className = "project_detail__header">
            <div className = "project_detail__header_info">
                <h1 style = {{color: `#${randomColorArray[randomNumber(randomColorArray.length)]}`}}> {project.name} </h1>
                <div className = "create__info">
                     Created by &nbsp;
                     <span style={{fontWeight:"bold"}}>{createdBy}</span> 
                     &nbsp; at {createAt}
                </div>
            </div>
            <div>
              <p> {<TrackTime projectId = {project.id} />} </p>
              <div style ={{fontSize: "1.5rem"}}> hours tracked</div>
            </div>
          </div>
          <div className = "project_detail__menu_link">
            <MenuProjectDetail />
            <Switch>
              {this.showRoute(routes)}
            </Switch>
          </div>
        </div>
        </Router>
      );
  }
}

const mapStateToProp = (state) => {
    const { projects } = state.projects;
    const user = state.members.selectedMember
    return {
      projects: projects.map((project) => {
        return { ...project, id: project.id };
      }),
      user : user
    };
  };
  export default connect(mapStateToProp, {
    fetchTasks,
    deleteProjects,
    getUser
  })(Projects);