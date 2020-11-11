import "./ViewTimeDDTime.css";
import React from "react";
import ChangeTime from "../../../../changeTime/ChangeTime";
import DropDown2 from "../../../../dropdown2/DropDown2";
import { connect } from "react-redux";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import Tooltip2 from "../../../../tooltip2/Tooltip2";
import { setTimes, setSelectedTime } from "../../../../../redux/actions";

const ViewTimeDDTime = ({
  time,
  isShow,
  onCloseHandler,
  preNearestTime,
  nextNearestTime,
  times,
  setTimes,
  preTime,
}) => {
  const renderContent = () => {
    return (
      <div className="view_time_dd_time" onClick={(e) => e.stopPropagation()}>
        <div className="view_time_dd_time__top">
          <div className="view_time_dd_time__left">
            <ChangeTime
              onCLickHandler={onMinusTimeHandler}
              title="earlier"
              conditionDisable={conditionDisablePre}
              getTime={getTimePre}
            />
          </div>
          <div className="view_time_dd_time__right">
            <ChangeTime
              onCLickHandler={onAddMinHandler}
              title="later"
              conditionDisable={conditionDisableNext}
              getTime={getTimeNext}
            />
          </div>
        </div>
        <div className="view_time_dd_time__bottom">
          <span
            onClick={setStartOfLastTime}
            className={
              checkOnOfLastTimeButtonDisable()
                ? "view_time_dd_time__tt_disable"
                : ""
            }
          >
            End of last timer
          </span>
          <Tooltip2
            arrow={false}
            renderContent={() => (
              <p className="view_time_dd_time__tt">Discard all changed</p>
            )}
          >
            <button
              onClick={onDiscardChanged}
              className={
                checkHaveAnyChange() ? "" : "view_time_dd_time__tt_disable"
              }
            >
              <RotateLeftIcon />
            </button>
          </Tooltip2>
        </div>
      </div>
    );
  };

  const setStartOfLastTime = () => {
    if (!checkOnOfLastTimeButtonDisable()) {
      setTimes(
        times.map((ele) => {
          if (ele.id === time.id) {
            return { ...time, startTime: preNearestTime.endTime };
          }
          return ele;
        })
      );
    }
  };

  const checkOnOfLastTimeButtonDisable = () => {
    if (!preNearestTime || preNearestTime.endTime === time.startTime) {
      return true;
    }
    return false;
  };

  const onDiscardChanged = () => {
    if (checkHaveAnyChange()) {
      setTimes(
        times.map((ele) => {
          if (ele.id === preTime.id) {
            return preTime;
          }
          return ele;
        })
      );
    }
  };

  const checkHaveAnyChange = () => {
    const temp = times.find((ele) => ele.id === preTime.id);
    if (
      temp.endTime !== preTime.endTime ||
      temp.startTime !== preTime.startTime
    ) {
      return true;
    }
    return false;
  };

  const onAddMinHandler = (min) => {
    const endTime = new Date(time.endTime);
    endTime.setMinutes(endTime.getMinutes() + min);
    const temp = { ...time };
    temp.endTime = new Date(endTime).toISOString();
    setTimes(
      times.map((ele) => {
        if (ele.id === time.id) {
          return temp;
        }
        return ele;
      })
    );
  };

  const onMinusTimeHandler = (min) => {
    const startTime = new Date(time.startTime);
    startTime.setMinutes(startTime.getMinutes() - min);
    const temp = { ...time };
    temp.startTime = new Date(startTime).toISOString();
    setTimes(
      times.map((ele) => {
        if (ele.id === time.id) {
          return temp;
        }
        return ele;
      })
    );
  };

  const conditionDisablePre = (min) => {
    const startTime = new Date(time.startTime);
    startTime.setMinutes(startTime.getMinutes() - min);
    if (preNearestTime) {
      if (startTime - new Date(preNearestTime.endTime) >= 0) {
        return false;
      }
      return true;
    } else {
      const temp = new Date(preTime.startTime);
      temp.setHours(0, 0, 0, 0);
      if (startTime - temp < 0) {
        return true;
      }
    }
    return false;
  };
  const conditionDisableNext = (min) => {
    const endTime = new Date(time.endTime);
    endTime.setMinutes(endTime.getMinutes() + min);
    if (nextNearestTime) {
      if (new Date(nextNearestTime.startTime) - endTime >= 0) {
        return false;
      }
      return true;
    } else {
      const temp = new Date(preTime.endTime);
      temp.setHours(23, 59, 59, 999);
      if (endTime - temp > 0) {
        return true;
      }
    }
    return false;
  };

  const getTimePre = (min) => {
    const temp = new Date(time.startTime);
    temp.setMinutes(temp.getMinutes() - min);
    return temp;
  };

  const getTimeNext = (min) => {
    const temp = new Date(time.endTime);
    temp.setMinutes(temp.getMinutes() + min);
    return temp;
  };

  return (
    <DropDown2
      isShow={isShow}
      onCloseHandler={onCloseHandler}
      renderContent={renderContent}
      css={{ padding: 0, overflowY: "hidden" }}
    />
  );
};

const mapStateToProps = (state) => {
  const { preNearestTime, nextNearestTime, times } = state.week;
  return {
    preNearestTime,
    nextNearestTime,
    times,
  };
};

export default connect(mapStateToProps, { setTimes, setSelectedTime })(
  ViewTimeDDTime
);
