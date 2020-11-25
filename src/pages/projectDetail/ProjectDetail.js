import React from "react";
import "./ProjectDetail.css";
import { connect } from "react-redux";
import { getUser, getWeek } from "../../redux/actions";
import TrackTime from "../companyProjects/TrackTime/TrackTime";
import ProjectDetailTask from "../../components/projectDetailItems/projectDetailTask/ProjectDetailTask";
import ProjectDetailTeam from "../../components/projectDetailItems/projectDetailTeam/ProjectDetailTeam";
import TabNav from "../../components/tabNav/TabNav";
import { convertTime } from "../../utils/Utils";
import timeCloudAPI from "../../apis/timeCloudAPI";
import Chart from "../../components/chart/Chart";
import WeekSelect from "../../components/timerCalendar/weekSelect/WeekSelect";
import { days as dayTitles, months, equalDates } from "../../utils/Utils";
import { withRouter } from "react-router-dom";

const convertDays = (days) => {
  return days.map((day, index) => {
    return `${months[day.getMonth()]} ${day.getDate()}`;
  });
};

class Projects extends React.Component {
  state = {
    project: null,
    unavailableUsers: [],
    data: [],
  };

  fetchTimeWeekByDay = (day) => {
    const { id } = this.props.match.params;
    let dayURL = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;
    timeCloudAPI()
      .get(`projects/${id}/date/${dayURL}/all-week-times`)
      .then((res) => {
        this.setState({
          data: res.data.map((ele) => (!ele ? 0 : convertTime(ele))),
        });
      });
  };

  componentDidUpdate = (preProps) => {
    const firstDay = this.props.days[0];
    if (!equalDates(preProps.days[0], firstDay)) {
      this.fetchTimeWeekByDay(firstDay);
    }
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

  componentDidMount = () => {
    this.fetchProject();
    this.props.getWeek(new Date());
    this.fetchTimeWeekByDay(new Date());
  };

  onDaySelected = (selectedDays) => {
    if (selectedDays.length) {
      const { days, getWeek } = this.props;
      const index = days.findIndex((ele) => equalDates(ele, selectedDays[0]));
      if (index === -1) {
        getWeek(selectedDays[0]);
        this.fetchTimeWeekByDay(selectedDays[0]);
      }
    }
  };

  render() {
    const { project, unavailableUsers, data } = this.state;
    let { days } = this.props;
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
      data,
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
        <div className="project_detail_feature">
          <WeekSelect onDaySelected={this.onDaySelected} />
        </div>
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
  const { days } = state.week;
  return {
    user: user,
    days,
  };
};

export default connect(mapStateToProp, {
  getUser,
  getWeek,
})(withRouter(Projects));
