import React from "react";
import "./ProjectList.css";
import { fetchProjects } from "../../redux/actions";
import { connect } from "react-redux";

const ProjectItem = () => {
  return <div>ProjectTiem</div>;
};

export default connect(fetchProjects)(ProjectItem);
