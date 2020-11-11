import "./TimeDDStartTime.css";
import React from "react";
import ChangeTime from "../../changeTime/ChangeTime";
import { connect } from "react-redux";
import { setBeginTime } from "../../../redux/actions";
import { BEGIN_TIME } from "../../../utils/localStorageContact";

const TimeDDStartTime = ({ beginTime, lastTime, setBeginTime, onCloseDD }) => {
  const getTime = (min) => {
    const temp = new Date(beginTime);
    temp.setMinutes(temp.getMinutes() - min);
    return temp;
  };

  const conditionDisable = (min) => {
    if (lastTime) {
      const temp = new Date(beginTime);
      temp.setMinutes(temp.getMinutes() - min);

      if (temp - new Date(lastTime.endTime) < 0) {
        return true;
      }
      return false;
    }
    return true;
  };

  const onButtonLastTimeClick = () => {
    const temp = new Date(lastTime.endTime);
    localStorage.setItem(BEGIN_TIME, temp);
    setBeginTime(temp);
    onCloseDD();
  };

  const onClickHandler = (min) => {
    const temp = new Date(beginTime);
    temp.setMinutes(temp.getMinutes() - min);
    localStorage.setItem(BEGIN_TIME, temp);
    setBeginTime(temp);
  };

  return (
    <div className="time_dd_start_time" onClick={(e) => e.stopPropagation()}>
      <ChangeTime
        title={new Date().toDateString()}
        getTime={getTime}
        conditionDisable={conditionDisable}
        onCLickHandler={onClickHandler}
      />
      <button onClick={onButtonLastTimeClick}>End of last timer</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { beginTime, lastTimeCurrentDay } = state.time;
  return {
    beginTime,
    lastTime: lastTimeCurrentDay,
  };
};

export default connect(mapStateToProps, { setBeginTime })(TimeDDStartTime);
