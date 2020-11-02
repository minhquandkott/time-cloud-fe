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
import { withRouter } from "react-router-dom";

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
    project: null,
    unavailableUsers: [],
  };

  fetchTimeWeekByDay = (day) => {
    const { id } = this.props.match.params;
    timeCloudAPI()
      .get(`projects/${id}/date/${day}/all-week-times`)
      .then((res) => {
        this.setState({
          data: res.data.map((ele) => (!ele ? 0 : convertTime(ele))),
        });
      });
  };

  async fetchProject() {
    const { id } = this.props.match.params;
    const requestProject = timeCloudAPI().get(`projects/${id}`);
    const res = await Promise.all([
      requestProject,
      this.fetchUnavailableUser(),
    ]);
    const project = res[0].data;
    this.setState(
      {
        project: project,
        unavailableUsers: res[1],
      },
      () => {
        this.props.getUser(project.createdBy);
      }
    );
  }

  async fetchUnavailableUser() {
    const { id } = this.props.match.params;
    let res = await timeCloudAPI().get(`projects/${id}/users?is_doing=false`);
    const users = res.data;
    res = await Promise.allSettled(
      users.map((ele) =>
        timeCloudAPI().get(`projects/${id}/users/${ele.user.id}/task_user`)
      )
    );
    return res.map((ele, index) => {
      return ele.value.data.reduce((acc, cur) => {
        if (!acc.tasks) acc.tasks = [];
        return {
          user: users[index].user,
          tasks: [...acc.tasks, cur.taskId],
        };
      }, {});
    });
  }

  componentDidUpdate = (preProps) => {
    let firstDay = this.props.firstDay;
    if (firstDay !== preProps.firstDay) {
      let day = `${firstDay.getFullYear()}-${
        firstDay.getMonth() + 1
      }-${firstDay.getDate()}`;
      this.fetchTimeWeekByDay(day);
    }
  };

  componentDidMount = () => {
    this.fetchProject();
    this.props.getCurrentWeek();
  };

  render() {
    const { data, project, unavailableUsers } = this.state;
    let { firstDay, lastDay } = this.props;
    if (firstDay) var days = listDay(firstDay, lastDay);
    var createAt = new Date(project?.createAt);
    createAt = createAt.toLocaleDateString();
    var createdBy = this.props.user?.name ? this.props.user.name : "";
    if (days)
      var labels = convertDays(days).map((day, index) => {
        return `${dayTitles[index]}, ${day}`;
      });
    let datasets = {
      label: "Times (Hour)",
      color: project?.color,
      data: data,
    };

    return (
      <div className="project_detail">
        <div className="project_detail__header">
          <div className="project_detail__header_info">
            <h1
              style={{
                color: project?.color,
                fontWeight: "600",
              }}
            >
              {" "}
              {project?.name}{" "}
            </h1>
            <div className="create__info">
              Created by &nbsp;
              <span style={{ fontWeight: "bold" }}>{createdBy}</span>
              &nbsp; at {createAt}
            </div>
          </div>
          <div className="tracked_time">
            <div className="tracked_time__hours">
              {project && <p> {<TrackTime projectId={project?.id} />} </p>}
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

        <TabNav tabTitles={["Tasks", "Team"]}>
          {project && (
            <ProjectDetailTask
              project={project}
              unavailableUsers={unavailableUsers}
            />
          )}
          {project && (
            <ProjectDetailTeam
              project={project}
              unavailableUsers={unavailableUsers}
            />
          )}
        </TabNav>
      </div>
    );
  }
}

const mapStateToProp = (state) => {
  const user = state.members.selectedMember;
  return {
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
})(withRouter(Projects));
