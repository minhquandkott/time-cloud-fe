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
import WeekSelected from "../../components/timerCalendar/weekSelect/WeekSelect";
import { getCurrentWeek } from "../../redux/actions/index";
import { days as dayTitles, months } from "../../utils/Utils";

const listDay = (firstDay, lastDay) => {
  let result = [];
  result.push(firstDay);
  for (let i = 1; i < 6; i++) {
    let day = new Date(result[i - 1]);
    day.setDate(day.getDate() + 1);
    result.push(day);
  }
  result.push(lastDay);
  return result;
};

const convertDays = (days) => {
  return days.map((day, index) => {
    return `${months[day.getMonth()]} ${day.getDate()}`;
  });
};

class Projects extends React.Component {
  state = {
    data: [],
  };

  fetchTimeWeekByDay = (day) => {
    const project = history.location.state;
    timeCloudAPI()
      .get(`projects/${project.id}/date/${day}/all-week-times`)
      .then((res) => {
        this.setState({
          data: res.data.map((ele) => (!ele ? 0 : convertTime(ele))),
        });
      });
  };

  componentDidUpdate = (preProps, preState) => {
    let firstDay = this.props.firstDay;
    if (firstDay !== preProps.firstDay) {
      let day = `${firstDay.getFullYear()}-${
        firstDay.getMonth() + 1
      }-${firstDay.getDate()}`;
      this.fetchTimeWeekByDay(day);
    }
  };

  componentDidMount = () => {
    var userId = history.location.state.createdBy;
    this.props.getUser(userId);
    this.props.getCurrentWeek();
  };

  render() {
    let { firstDay, lastDay } = this.props;
    const { data } = this.state;
    if (firstDay) var days = listDay(firstDay, lastDay);
    var project = history.location.state;
    var createAt = new Date(project.createAt);
    createAt = createAt.toLocaleDateString();
    var createdBy = this.props.user?.name ? this.props.user.name : "";
    if (days)
      var labels = convertDays(days).map((day, index) => {
        return `${dayTitles[index]}, ${day}`;
      });
    let datasets = {
      label: "Times (Hour)",
      color: project.color,
      data: data,
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
        {days ? (
          <div className="project_detail_feature">
            <WeekSelected days={days} />
          </div>
        ) : (
          ""
        )}
        <div className="project_detail__chart">
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
    firstDay: state.week.firstDay,
    lastDay: state.week.lastDay,
  };
};
export default connect(mapStateToProp, {
  fetchTasks,
  deleteProjects,
  getUser,
  getCurrentWeek,
})(Projects);
