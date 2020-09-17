import React from "react";
import "./Counter.css";
import { connect } from "react-redux";
import {
  setIntervalId,
  checkCurrentTime,
  updateTime,
} from "../../redux/actions";
import { SELECTED_TASK_ID, BEGIN_TIME } from "../../utils/localStorageContact";
import { convertSecond } from "../../utils/Utils";
class Counter extends React.Component {
  updateTime = () => {
    let { totalSecond } = this.state;
    this.setState({ totalSecond: totalSecond + 1 });
  };

  componentDidMount() {
    this.props.checkCurrentTime();
  }

  componentDidUpdate() {
    if (this.props.isCounting && !this.props.intervalId) {
      const { selectedTaskId, beginTime } = this.props;
      const id = setInterval(this.props.updateTime, 10);
      this.props.setIntervalId(id);
      localStorage.setItem(SELECTED_TASK_ID, selectedTaskId);
      if (!localStorage.getItem(BEGIN_TIME)) {
        localStorage.setItem(BEGIN_TIME, beginTime);
      }
    }
  }

  render() {
    const { hour, minute, second } = convertSecond(this.props.totalSecond);
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
    selectedTaskId: state.time.selectedTask?.id,
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
