import React, { Component } from "react";
import "./TotalTimeByWeek.css";
import { connect } from "react-redux";
import { convertSecondToHour } from "../../../../utils/Utils";
class TotalTimeByWeek extends Component {
  render() {
    const { weekTotalTime, isLoading } = this.props;

    return (
      <div className="total_time_by_week">
        <div className="total_time_by_week__title">Total</div>
        <div className="total_time_by_week__hours">
          {isLoading ? "0:00" : convertSecondToHour(weekTotalTime)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { weekTotalTime, isLoadingTotalTimes } = state.week;
  return {
    weekTotalTime,
    isLoading: isLoadingTotalTimes,
  };
};

export default connect(mapStateToProps)(TotalTimeByWeek);
