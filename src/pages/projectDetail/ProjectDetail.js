import React from "react";
import "./ProjectDetail.css";
import { connect } from "react-redux";
import { deleteProjects, fetchTasks, getUser } from "../../redux/actions";
import history from "../../history";
import TrackTime from "../companyProjects/TrackTime/TrackTime";
import ProjectDetailTask from "../../components/projectDetailItems/projectDetailTask/ProjectDetailTask";
import ProjectDetailTeam from "../../components/projectDetailItems/projectDetailTeam/ProjectDetailTeam";
import ProjectDetailDiscussion from "../../components/projectDetailItems/projectDetailDiscussion/ProjectDetailDiscussion";
import TabNav from "../../components/tabNav/TabNav";
import { convertTime } from "../../utils/Utils";
import timeCloudAPI from "../../apis/timeCloudAPI";
import Chart from "../../components/chart/Chart";

class Projects extends React.Component {
  state = {
    data: [],
  };

  componentDidMount = () => {
    var userId = history.location.state.createdBy;
    const project = history.location.state;
    let date = new Date();
    let day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    this.props.getUser(userId);
    timeCloudAPI()
      .get(`projects/${project.id}/date/${day}/all-week-times`)
      .then((res) => {
        this.setState({
          data: res.data.map((ele) => (!ele ? 0 : convertTime(ele))),
        });
      });
  };

  render() {
    var project = history.location.state;
    var x = new Date(project.createAt);
    var createAt = new Date(project.createAt);
    createAt = createAt.toLocaleDateString();
    var createdBy = this.props.user?.name ? this.props.user.name : "";

    let labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let datasets = {
      label: "Times (Hour)",
      color: project.color,
      data: this.state.data,
    };

    return (
      <div className="project_detail">
        <div className="project_detail__header">
          <div className="project_detail__header_info">
            <h1
              style={{
                color: project.color,
                fontWeight: "600",
              }}
            >
              {" "}
              {project.name}{" "}
            </h1>
            <div className="create__info">
              Created by &nbsp;
              <span style={{ fontWeight: "bold" }}>{createdBy}</span>
              &nbsp; at {createAt}
            </div>
          </div>
          <div className="tracked_time">
            <div className="tracked_time__hours">
              <p> {<TrackTime projectId={project.id} />} </p>
            </div>
            <div style={{ fontSize: "1.5rem" }}> hours tracked</div>
          </div>
        </div>
        <div>
          <Chart labels={labels} datasets={datasets} />
        </div>
        <TabNav tabTitles={["Tasks", "Team", "Discussion"]}>
          <ProjectDetailTask project={project} />
          <ProjectDetailTeam project={project} />
          <ProjectDetailDiscussion />
        </TabNav>
      </div>
    );
  }
}

const mapStateToProp = (state) => {
  const { projects } = state.projects;
  const user = state.members.selectedMember;
  return {
    projects: projects.map((project) => {
      return { ...project, id: project.id };
    }),
    user: user,
  };
};
export default connect(mapStateToProp, {
  fetchTasks,
  deleteProjects,
  getUser,
})(Projects);
