import React, { Component } from "react";
import "./WeekHeader.css";
import WeekHeaderItem from "./weekHeaderItem/WeekHeaderItem";
import TotalTimeByWeek from "./totalTimeByWeek/TotalTimeByWeek";
import { connect } from "react-redux";
import { v4 } from "uuid";

class WeekHeader extends Component {
  render() {
    const { dayTotalTimes, days } = this.props;
    return (
      <div className="week_header">
        <div className="week_header__content">
          {days.map((day, index) => (
            <WeekHeaderItem
              totalTime={dayTotalTimes[index]}
              day={day}
              index={index}
              key={v4()}
            />
          ))}
          <TotalTimeByWeek />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { dayTotalTimes, days } = state.week;
  return {
    dayTotalTimes,
    days,
  };
};
export default connect(mapStateToProps)(WeekHeader);
