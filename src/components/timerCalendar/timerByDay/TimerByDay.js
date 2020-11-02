import React, { Component } from "react";
import ViewTime from "./viewTime/ViewTime";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import "./TimerByDay.css";
import Skeleton from "../../../components/loading/skeleton/Skeleton";
import { connect } from "react-redux";
import { fetchTotalTimeDaySelected } from "../../../redux/actions";
import { convertDate } from "../../../utils/Utils";

class TimerByDay extends Component {
  componentDidMount = () => {
    const { day } = this.props;
    this.props.fetchTotalTimeDaySelected(convertDate(day));
  };

  componentDidUpdate = (preProps) => {
    const { day } = this.props;
    if (day !== preProps.day) {
      this.props.fetchTotalTimeDaySelected(convertDate(day));
    }
  };

  render() {
    const { times, isLoading } = this.props;
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

const mapStateToProps = (state) => {
  return {
    isLoading: state.week.isLoading,
    times: state.week.listTimeOfSelectedDay,
  };
};

export default connect(mapStateToProps, { fetchTotalTimeDaySelected })(
  TimerByDay
);
