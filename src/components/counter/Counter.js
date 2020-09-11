import React from "react";
import "./Counter.css";
import { connect } from "react-redux";
import { setIntervalId } from "../../redux/actions";

class Counter extends React.Component {
  state = {
    totalSecond: 0,
    second: "00",
    minute: "00",
    hour: "0",
  };

  updateTime = () => {
    let { totalSecond } = this.state;
    this.setState({ totalSecond: totalSecond + 1 });
    this.convertSecond(this.state.totalSecond);
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
    this.setState({
      second: convertedSecond < 10 ? `0${convertedSecond}` : convertedSecond,
      minute: convertedMinute < 10 ? `0${convertedMinute}` : convertedHour,
      hour: convertedHour,
    });
  };
  componentDidMount() {}

  render() {
    console.log(this.props.intervalId);
    if (this.props.isCounting && !this.props.intervalId) {
      const id = setInterval(this.updateTime, 1000);
      this.props.setIntervalId(id);
    }
    return (
      <div className="counter">
        <span className="element counter__hour">{this.state.hour}</span>:
        <span className="element counter__minute">{this.state.minute}</span>:
        <span className="element counter__second">{this.state.second}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isCounting: state.time.isCounting,
    intervalId: state.time.intervalId,
  };
};
export default connect(mapStateToProps, {
  setIntervalId,
})(Counter);
