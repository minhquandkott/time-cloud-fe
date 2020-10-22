import React from "react";
import "./Timer.css";
import Time from "../../components/time/Time";
import ProjectList from "../../components/projects/ProjectList";
import TimerCalendar from '../../components/timerCalendar/TimerCalendar';

class Timer extends React.Component {
  render() {
    return (
      <div className="timer">
        <Time />
        <ProjectList />
        <TimerCalendar />
      </div>
    );
  }
}

export default Timer;
