import React from "react";
import "./ProjectItem.css";
import { fetchProjects } from "../../../redux/actions";
import { connect } from "react-redux";

class ProjectItem extends React.Component {
  componentDidMount() {
    this.props.fetchProjects(this.props.userId);
  }
  render() {
    return (
      <div className="project_item">
        <div className="project_item__header">
          <h3>CES</h3>
          <h2>Trainning</h2>
        </div>
        <div className="project_item__info">{this.props.children}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};

export default connect(null, {
  fetchProjects,
})(ProjectItem);
