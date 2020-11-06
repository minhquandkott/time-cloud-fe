import React, { Component } from "react";
import { connect } from "react-redux";
import "./WeekSelect.css";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { months } from "../../../utils/Utils";
import { getNextWeek, getPreWeek } from "../../../redux/actions";
import { checkDayInWeekNow } from "../../../utils/Utils";

class WeekSelect extends Component {
  onNextWeek = () => {
    this.props.getNextWeek();
  };

  onPreWeek = () => {
    this.props.getPreWeek();
  };

  render() {
    let { days } = this.props;
    let weekName = `${months[days[0].getMonth()]} ${days[0].getDate()} - ${
      months[days[6].getMonth()]
    } ${days[6].getDate()}`;
    return (
      <div className="week_select">
        <button
          // disabled={checkLastWeek}
          // style={{ backgroundColor: checkLastWeek ? "#f5f2f2" : "" }}
          onClick={this.onPreWeek}
        >
          {" "}
          <NavigateBeforeIcon style={{ fontSize: "1.5rem" }} />{" "}
        </button>
        <div className="week_select__name"> {weekName} </div>
        <button
          disabled={checkDayInWeekNow(days[0]) === 0}
          style={{
            backgroundColor: checkDayInWeekNow(days[0]) === 0 ? "#f5f2f2" : "",
          }}
          onClick={this.onNextWeek}
        >
          {" "}
          <NavigateNextIcon style={{ fontSize: "1.5rem" }} />{" "}
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    days: state.week.days,
  };
};

export default connect(mapStateToProps, {
  getNextWeek,
  getPreWeek,
})(WeekSelect);
