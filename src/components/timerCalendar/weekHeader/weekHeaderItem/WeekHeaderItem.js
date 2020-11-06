import React, { Component } from "react";
import "./WeekHeaderItem.css";
import { connect } from "react-redux";
import { selectDay } from "../../../../redux/actions";
import {
  days as dayTitles,
  convertSecondToHour,
  checkDayWithNow,
} from "../../../../utils/Utils";

class WeekHeaderItem extends Component {
  onButtonClick = (index) => {
    this.props.selectDay(index);
  };

  render() {
    const { index, totalTime, day, selectedIndex, isLoading } = this.props;
    const isDisable = checkDayWithNow(day);
    return (
      <button
        style={{
          background: selectedIndex === index ? "#f3f4f9" : "white",
          color:
            selectedIndex === index
              ? "var(--color-button)"
              : isDisable === 1
              ? "#c1c1c1"
              : "black",
          pointerEvents: isDisable === 1 ? "none" : "initial",
        }}
        onClick={() => this.onButtonClick(index)}
        className="week_header_item"
      >
        <p className="week_header_item__day">{dayTitles[index]}</p>
        <p className="week_header_item__total_time">
          {isLoading ? "0:00" : convertSecondToHour(totalTime)}
        </p>
      </button>
    );
  }
}

const mapStateToProps = (state) => {
  const { selectedIndex, isLoadingTotalTimes } = state.week;
  return {
    selectedIndex,
    isLoading: isLoadingTotalTimes,
  };
};
export default connect(mapStateToProps, { selectDay })(WeekHeaderItem);
