import "./ViewTimeDDTime.css";
import React from "react";
import ChangeTime from "../../../../changeTime/ChangeTime";
import DropDown2 from "../../../../dropdown2/DropDown2";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import Tooltip2 from "../../../../tooltip2/Tooltip2";
import { equalDateTime } from "../../../../../utils/Utils";

const ViewTimeDDTime = ({
  time,
  isShow,
  onCloseHandler,
  preNearestTime,
  nextNearestTime,
  preTime,
  onChangeTime,
  onDiscardChanged,
  children,
  onActionExtractClick,
  conditionDisableActionExtract,
  actionExtractTitle,
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
          {actionExtractTitle && (
            <span
              onClick={onActionExtractClick}
              className={
                conditionDisableActionExtract()
                  ? "view_time_dd_time__tt_disable"
                  : ""
              }
            >
              {actionExtractTitle}
            </span>
          )}
          <Tooltip2
            arrow={false}
            renderContent={() => (
              <p className="view_time_dd_time__tt">Discard all changed</p>
            )}
          >
            <button
              onClick={onDiscardChangedHandler}
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

  // const setStartOfLastTime = () => {
  //   if (!checkOnOfLastTimeButtonDisable()) {
  //     setTimes(
  //       times.map((ele) => {
  //         if (ele.id === time.id) {
  //           return { ...time, startTime: preNearestTime.endTime };
  //         }
  //         return ele;
  //       })
  //     );
  //   }
  // };

  const onDiscardChangedHandler = () => {
    if (checkHaveAnyChange()) {
      onDiscardChanged();
    }
  };

  const checkHaveAnyChange = () => {
    if (equalDateTime(new Date(preTime), new Date(time))) {
      return false;
    }
    return true;
  };

  const onAddMinHandler = (min) => {
    const newTime = new Date(time);
    newTime.setMinutes(newTime.getMinutes() + min);
    onChangeTime(newTime);
  };

  const onMinusTimeHandler = (min) => {
    const newTime = new Date(time);
    newTime.setMinutes(newTime.getMinutes() - min);
    onChangeTime(newTime);
  };

  const conditionDisablePre = (min) => {
    const temp = new Date(time);
    temp.setMinutes(temp.getMinutes() - min);
    if (preNearestTime) {
      if (temp - new Date(preNearestTime) >= 0) {
        return false;
      }
      return true;
    } else {
      const beginToday = new Date(preTime);
      beginToday.setHours(0, 0, 0, 0);
      if (temp - beginToday < 0) {
        return true;
      }
    }
    return false;
  };
  const conditionDisableNext = (min) => {
    const temp = new Date(time);
    temp.setMinutes(temp.getMinutes() + min);
    if (nextNearestTime) {
      if (new Date(nextNearestTime) - temp >= 0) {
        return false;
      }
      return true;
    } else {
      const endToday = new Date(preTime);
      temp.setHours(23, 59, 59, 999);
      if (temp - endToday > 0) {
        return true;
      }
    }
    return false;
  };

  const getTimePre = (min) => {
    const temp = new Date(time);
    temp.setMinutes(temp.getMinutes() - min);
    return temp;
  };

  const getTimeNext = (min) => {
    const temp = new Date(time);
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

export default ViewTimeDDTime;
