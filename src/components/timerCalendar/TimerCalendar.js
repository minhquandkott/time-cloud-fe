import React, { Component } from "react";
import { connect } from "react-redux";
import "./TimerCalendar.css";
import { getWeekNow } from "../../redux/actions";
import WeekSelect from "./weekSelect/WeekSelect";
import WeekHeader from "./weekHeader/WeekHeader";
import TimerByDay from "./timerByDay/TimerByDay";

class TimerCalender extends Component {
  componentDidMount() {
    this.props.getWeekNow();
  }
  render() {
    return (
      <div className="timer_calendar">
        <WeekSelect />
        <WeekHeader />
        <TimerByDay />
      </div>
    );
  }
}

export default connect(null, {
  getWeekNow,
})(TimerCalender);
