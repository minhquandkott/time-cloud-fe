import { TIME_END, TIME_START, TIME_SET_INTERVAL_ID } from "./actionType";
import timeCloudAPI from "../../apis/timeCloudAPI";

export const beginCountingTime = (beginTime, intervalId) => {
  return {
    type: TIME_START,
    payload: {
      beginTime: beginTime,
      intervalId: intervalId,
    },
  };
};

export const endCountingTime = (endTime) => {
  return {
    type: TIME_END,
    payload: {
      endTime: endTime,
    },
  };
};

export const createTime = (description, name) => {
  return (dispatch, getState) => {
    const { time } = getState();
    if (!time.isCounting) {
      dispatch(beginCountingTime(new Date().getTime()));
    } else {
      dispatch(endCountingTime(new Date().getTime()));
      clearInterval(time.intervalId);
    }
  };
};

export const editTime = (endTime) => {
  return (dispatch, state) => {
    dispatch(
      endCountingTime(new Date().getTime(), endTime - new Date().getTime)()
    );
  };
};

export const setIntervalId = (intervalId) => {
  return {
    type: TIME_SET_INTERVAL_ID,
    payload: intervalId,
  };
};
