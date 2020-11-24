import React, { Component } from "react";
import { connect } from "react-redux";
import "./WeekSelect.css";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { months } from "../../../utils/Utils";
import { getNextWeek, getPreWeek } from "../../../redux/actions";
import { checkDayInWeekNow, checkDayInWeek } from "../../../utils/Utils";
import SelectCalendar from "../../selectCalendar/SelectCalendar";

class WeekSelect extends Component {
  onNextWeek = () => {
    this.props.getNextWeek();
  };

  onPreWeek = () => {
    this.props.getPreWeek();
  };

  conditionDisableSelectWeekButton = () => {
    const { days, user } = this.props;
    if (user && days.length)
      return checkDayInWeek(new Date(user.createAt), days) === 0;
    return false;
  };

  conditionDisableCalendar = (date) => {
    if (date - new Date() > 0) return true;
    if (new Date(this.props.user?.createAt) - date > 0) return true;
    return false;
  };
  render() {
    const { days, selectedIndex } = this.props;
    let weekName = `${months[days[0].getMonth()]} ${days[0].getDate()} - ${
      months[days[6].getMonth()]
    } ${days[6].getDate()}`;
    return (
      <div className="week_select">
        <button
          disabled={this.conditionDisableSelectWeekButton()}
          onClick={this.onPreWeek}
          className={this.conditionDisableSelectWeekButton() ? "disable" : ""}
        >
          {" "}
          <NavigateBeforeIcon style={{ fontSize: "1.5rem" }} />{" "}
        </button>
        <div className="week_select__name"> {weekName} </div>
        <button
          disabled={!checkDayInWeekNow(days[0])}
          className={!checkDayInWeekNow(days[0]) ? "disable" : ""}
          onClick={this.onNextWeek}
        >
          {" "}
          <NavigateNextIcon style={{ fontSize: "1.5rem" }} />{" "}
        </button>
        <SelectCalendar
          value={[days[selectedIndex]]}
          multipleSelect={false}
          onSelectDay={this.props.onDaySelected}
          conditionDisable={this.conditionDisableCalendar}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { days, selectedIndex } = state.week;
  const { user } = state.auth;
  return {
    days,
    selectedIndex,
    user,
  };
};

export default connect(mapStateToProps, {
  getNextWeek,
  getPreWeek,
})(WeekSelect);
