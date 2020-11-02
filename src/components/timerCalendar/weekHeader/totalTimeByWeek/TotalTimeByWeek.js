import React, { Component } from "react";
import "./TotalTimeByWeek.css";
import timeCloudAPI from "../../../../apis/timeCloudAPI";
import { convertSecondToHour } from "../../../../utils/Utils";
import { connect } from "react-redux";

class TotalTimeByWeek extends Component {
  state = {
    totalTime: 0,
  };

  fetchTotalTimeByWeek = (days) => {
    if (!this.props.totalTime || this.props.totalTime === 0) {
      let date = `${days[0].getFullYear()}-${
        days[0].getMonth() + 1
      }-${days[0].getDate()}`;
      timeCloudAPI()
        .get(`users/${localStorage.getItem("userId")}/week/${date}/total-times`)
        .then((res) => {
          this.setState({
            totalTime: res.data,
          });
        });
    }
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.totalTime !== nextProps.totalTime &&
      nextProps.totalTime !== undefined
    ) {
      this.setState({ totalTime: nextProps.totalTime });
    }
  }

  componentDidMount = () => {
    const { days } = this.props;
    this.fetchTotalTimeByWeek(days);
  };

  componentDidUpdate = (preProps) => {
    const { days } = this.props;
    if (days !== preProps.days) {
      this.fetchTotalTimeByWeek(days);
    }
  };

  render() {
    const { totalTime } = this.state;
    console.log(totalTime);
    return (
      <div className="total_time_by_week">
        <div className="total_time_by_week__title">Total</div>
        <div className="total_time_by_week__hours">
          {convertSecondToHour(totalTime)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const result = {};
  const { days } = ownProps;
  const temp = days.map((day) => day.toDateString());
  if (temp.some((ele) => ele === new Date().toDateString())) {
    result.totalTime = state.week.totalTimeCurrentWeek;
  }
  return result;
};

export default connect(mapStateToProps)(TotalTimeByWeek);
