import React, { Component } from "react";
import { connect } from "react-redux";
import "./TimerCalendar.css";
import { getWeek, selectDay } from "../../redux/actions";
import WeekSelect from "./weekSelect/WeekSelect";
import WeekHeader from "./weekHeader/WeekHeader";
import TimerByDay from "./timerByDay/TimerByDay";
import { equalDates } from "../../utils/Utils";

class TimerCalender extends Component {
  componentDidMount() {
    this.props.getWeek(new Date());
  }

  onDaySelected = (selectedDays) => {
    const { days, getWeek, selectDay } = this.props;
    const index = days.findIndex((ele) => equalDates(ele, selectedDays[0]));
    if (index === -1) {
      getWeek(selectedDays[0]);
    } else {
      selectDay(index);
    }
  };

  render() {
    return (
      <div className="timer_calendar">
        <WeekSelect onDaySelected={this.onDaySelected} />
        <WeekHeader />
        <TimerByDay />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { days } = state.week;
  return {
    days,
  };
};

export default connect(mapStateToProps, {
  getWeek,
  selectDay,
})(TimerCalender);
