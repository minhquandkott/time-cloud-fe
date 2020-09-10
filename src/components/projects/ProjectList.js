import React from "react";
import "./ProjectList.css";
import { fetchProjects } from "../../redux/actions";
import { connect } from "react-redux";
import ProjectItem from "./projectItem/ProjectItem";

class ProjectList extends React.Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  renderProjectList() {
    return this.props.projects.map((project) => {
      return <ProjectItem project={project} key={project.id} />;
    });
  }
  render() {
    console.log(this.props);
    return <div className="project_list">{this.renderProjectList()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects["projects"],
  };
};

export default connect(mapStateToProps, {
  fetchProjects,
})(ProjectList);
