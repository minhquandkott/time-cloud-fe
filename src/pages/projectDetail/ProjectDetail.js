import React from "react";
import "./ProjectDetail.css";
import { connect } from "react-redux";
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from "../../components/table/Table";
import { deleteProjects, fetchTasks, getUser } from "../../redux/actions";
import Point from "../../components/point/Point";

class Projects extends React.Component {

  componentDidMount = () => {
    var userId = this.props.location.state.project.element.createdBy;
    this.props.getUser(userId);
  }

  render() {

      var project = this.props.location.state.project.element;
      console.log(project);
      var createAt = new Date(project.createAt);
      createAt = createAt.toLocaleDateString();
      var createdBy = this.props.user?.name ? this.props.user.name : '';
      console.log(createdBy);
    return (
        <div className = "project_detail">
            <div className = "project_detail__header">
                <h1> {project.name} </h1>
                <div className = "create__info">
                    {`Created by ${createdBy} at ${createAt}`}
                </div>
            </div>
            <div className ="project_detail__time" >
              
            </div>
        </div>
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