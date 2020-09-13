import React from "react";
import "./Counter.css";
import { connect } from "react-redux";
import {
  setIntervalId,
  checkCurrentTime,
  updateTime,
} from "../../redux/actions";
import { SELECTED_TASK_ID, BEGIN_TIME } from "../../utils/localStorageContact";

class Counter extends React.Component {
  // state = {
  //   totalSecond: 0,
  // };

  updateTime = () => {
    let { totalSecond } = this.state;
    this.setState({ totalSecond: totalSecond + 1 });
  };

  convertSecond = (totalSecond) => {
    let timeRemaining = totalSecond;
    const convertedHour =
      totalSecond > 3600 ? Math.floor(totalSecond / 3600) : 0;
    timeRemaining = timeRemaining - convertedHour * 3600;
    const convertedMinute =
      timeRemaining > 60 ? Math.floor(timeRemaining / 60) : 0;
    timeRemaining = timeRemaining - convertedMinute * 60;

    const convertedSecond = timeRemaining;
    return {
      second: convertedSecond < 10 ? `0${convertedSecond}` : convertedSecond,
      minute: convertedMinute < 10 ? `0${convertedMinute}` : convertedHour,
      hour: convertedHour + "",
    };
  };
  componentDidMount() {
    this.props.checkCurrentTime();
  }

  componentDidUpdate() {
    if (this.props.isCounting && !this.props.intervalId) {
      const { selectedTaskId, beginTime } = this.props;
      const id = setInterval(this.props.updateTime, 1000);
      this.props.setIntervalId(id);
      localStorage.setItem(SELECTED_TASK_ID, selectedTaskId);
      localStorage.setItem(BEGIN_TIME, beginTime);
    }
  }

  render() {
    const { hour, minute, second } = this.convertSecond(this.props.totalSecond);
    return (
      <div className="counter">
        <span className="element counter__hour">{hour}</span>:
        <span className="element counter__minute">{minute}</span>:
        <span className="element counter__second">{second}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    isCounting,
    beginTime,
    preCountingTime,
    intervalId,
    totalSecond,
  } = state.time;
  return {
    isCounting: isCounting,
    selectedTaskId: state.tasks?.selectedTask?.id,
    beginTime: beginTime,
    preCountingTime: preCountingTime,
    intervalId: intervalId,
    totalSecond: totalSecond,
  };
};
export default connect(mapStateToProps, {
  setIntervalId,
  checkCurrentTime,
  updateTime,
})(Counter);
