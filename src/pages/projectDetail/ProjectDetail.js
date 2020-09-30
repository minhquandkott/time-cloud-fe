import React from "react";
import "./ProjectDetail.css";
import { connect } from "react-redux";
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from "../../components/table/Table";
import { fetchProjects, deleteProjects, fetchTasks } from "../../redux/actions";
import Point from "../../components/point/Point";

class Projects extends React.Component {

  render() {
      var project = this.props.location.state.project.element;
      console.log(project);
    return (
        <div className = "project_detail">
            <div className = "project_detail__header">
                <h1> {project.name} </h1>
            </div>
        </div>
      );
  }
}

const mapStateToProp = (state) => {
    const { projects } = state.projects;
    return {
      projects: projects.map((project) => {
        return { ...project, id: project.id };
      }),
    };
  };
  export default connect(mapStateToProp, {
    fetchTasks,
    deleteProjects
  })(Projects);