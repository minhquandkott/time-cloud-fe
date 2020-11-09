import React, { Component } from "react";
import ViewTime from "./viewTime/ViewTime";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import "./TimerByDay.css";
import Skeleton from "../../../components/loading/skeleton/Skeleton";
import { connect } from "react-redux";

class TimerByDay extends Component {
  render() {
    const { times, isLoading } = this.props;
    return (
      <div className="timer_by_day">
        {isLoading ? (
          <Skeleton countItem={3} heightItem="4rem" direction="column" />
        ) : times.length ? (
          times.map((time, index) => {
            return <ViewTime key={time.id} time={time} index={index} />;
          })
        ) : (
          <p>
            {" "}
            <PriorityHighIcon style={{ fontSize: "4rem", color: "red" }} />
            Look like you haven't done any time on this day
          </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { times, isLoadingTimes } = state.week;
  return {
    times,
    isLoading: isLoadingTimes,
  };
};

export default connect(mapStateToProps)(TimerByDay);
