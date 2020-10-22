import React from "react";
import "./Counter.css";
import { connect } from "react-redux";
import {} from "../../redux/actions";
import { convertSecond } from "../../utils/Utils";
class Counter extends React.Component {
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
