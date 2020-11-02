import React, { Component } from "react";
import "./WeekHeaderItem.css";
import timeCloudAPI from "../../../../apis/timeCloudAPI";
import { convertSecondToHour } from "../../../../utils/Utils";
import { connect } from "react-redux";

class WeekHeaderItem extends Component {
  state = {
    totalTime: 0,
  };

  fetchTotalTime = (date) => {
    if (
      this.props.totalTimeCurrentDay === 0 ||
      this.props.totalTimeCurrentDay
    ) {
      this.setState({
        totalTime: this.props.totalTimeCurrentDay,
      });
    } else {
      let dateURL = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      timeCloudAPI()
        .get(
          `users/${localStorage.getItem("userId")}/date/${dateURL}/total-times`
        )
        .then((res) => {
          this.setState({
            totalTime: res.data,
          });
        });
    }
  };

  componentDidUpdate = (preProps) => {
    const { date, totalTimeCurrentDay } = this.props;
    if (
      date !== preProps.date ||
      totalTimeCurrentDay !== preProps.totalTimeCurrentDay
    ) {
      this.fetchTotalTime(date);
    }
  };

  componentDidMount = () => {
    const { date } = this.props;
    this.fetchTotalTime(date);
  };
  render() {
    const { day } = this.props;
    const { totalTime } = this.state;
    return (
      <div className="week_header_item">
        <p className="week_header_item__day">{day}</p>
        <p className="week_header_item__total_time">
          {convertSecondToHour(totalTime)}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { date } = ownProps;
  const result = {};
  if (new Date().toDateString() === date.toDateString()) {
    result.totalTimeCurrentDay = state.week.totalTimeCurrentDay;
  }
  return result;
};
export default connect(mapStateToProps)(WeekHeaderItem);
