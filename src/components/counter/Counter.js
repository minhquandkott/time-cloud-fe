import React from "react";
import "./Counter.css";
import { connect } from "react-redux";
import {} from "../../redux/actions";
import { convertSecond } from "../../utils/Utils";
class Counter extends React.Component {
  // updateTime = () => {

  //   this.setState({ totalSecond: totalSecond + 1 });
  // };

  // componentDidMount() {
  //   this.props.checkCurrentTime();
  // }

  // componentDidUpdate() {
  //   if (this.props.isCounting && !this.props.intervalId) {
  //     const { selectedTaskId, beginTime } = this.props;
  //     const id = setInterval(this.props.updateTime, 10);
  //     this.props.setIntervalId(id);
  //     localStorage.setItem(SELECTED_TASK_ID, selectedTaskId);
  //     if (!localStorage.getItem(BEGIN_TIME)) {
  //       localStorage.setItem(BEGIN_TIME, beginTime);
  //     }
  //   }
  // }

  render() {
    const { totalSecond } = this.props;
    const { hour, minute, second } = convertSecond(totalSecond);
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
  const { isCounting, totalSecond } = state.time;
  return {
    isCounting,
    totalSecond,
  };
};
export default connect(mapStateToProps)(Counter);
