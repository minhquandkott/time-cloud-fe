import React, { Component } from "react";
import ViewTime from "./viewTime/ViewTime";
import timeCloudAPI from "../../../apis/timeCloudAPI";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import "./TimerByDay.css";
import Skeleton from "../../../components/loading/skeleton/Skeleton";

class TimerByDay extends Component {
  state = {
    times: [],
    isLoading: false,
  };

  fetchTimes = (day) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        timeCloudAPI()
          .get(`users/${localStorage.getItem("userId")}/times`)
          .then((res) => {
            let times = res.data;
            times = times.filter((time) => {
              let timeDate = new Date(time.createAt);
              return (
                day.getFullYear() === timeDate.getFullYear() &&
                day.getMonth() === timeDate.getMonth() &&
                day.getDate() === timeDate.getDate()
              );
            });
            this.setState({
              times: times,
              isLoading: false,
            });
          });
      }
    );
  };

  componentDidMount = () => {
    const { day } = this.props;
    this.fetchTimes(day);
  };

  componentDidUpdate = (preProps, preState) => {
    const { day } = this.props;
    if (day !== preProps.day) {
      this.fetchTimes(day);
    }
  };

  render() {
    const { times, isLoading } = this.state;
    return (
      <div className="timer_by_day">
        {!isLoading ? (
          times.length ? (
            times.map((time) => {
              return <ViewTime key={time.id} time={time} />;
            })
          ) : (
            <p>
              {" "}
              <PriorityHighIcon style={{ fontSize: "4rem", color: "red" }} />
              Look like you haven't done any time on this day
            </p>
          )
        ) : (
          <Skeleton countItem={3} heightItem="4rem" direction="column" />
        )}
      </div>
    );
  }
}

export default TimerByDay;
