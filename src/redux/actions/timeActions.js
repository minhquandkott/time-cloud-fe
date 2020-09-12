import {
  TIME_END,
  TIME_START,
  TIME_SET_INTERVAL_ID,
  STOP_COUNTING_TIME,
  INCREASE_TIME,
} from "./actionType";
import { SELECTED_TASK_ID, BEGIN_TIME } from "../../utils/localStorageContact";
//import timeCloudAPI from "../../apis/timeCloudAPI";
import { fetchTask } from "./taskActions";

export const beginCountingTime = (beginTime, preCountingTime) => {
  return {
    type: TIME_START,
    payload: {
      beginTime: beginTime,
      preCountingTime: preCountingTime,
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
      dispatch(setCurrentTime(0));
      localStorage.removeItem(SELECTED_TASK_ID);
      localStorage.removeItem(BEGIN_TIME);
      clearInterval(time.intervalId);
    }
  };
};

export const setIntervalId = (intervalId) => {
  return {
    type: TIME_SET_INTERVAL_ID,
    payload: intervalId,
  };
};

export const checkCurrentTime = () => {
  return (dispatch) => {
    const selectedTaskId = localStorage.getItem(SELECTED_TASK_ID);
    const beginTime = localStorage.getItem(BEGIN_TIME);
    if (selectedTaskId && beginCountingTime) {
      const preCountingTime = new Date().getTime() - parseInt(beginTime);
      dispatch(beginCountingTime(parseInt(beginTime)));
      dispatch(fetchTask(parseInt(selectedTaskId)));
      dispatch(stopCounting());
      dispatch(setCurrentTime(Math.floor(preCountingTime / 1000)));
    }
  };
};

export const stopCounting = () => {
  return {
    type: STOP_COUNTING_TIME,
  };
};

export const setCurrentTime = (value) => {
  return {
    type: INCREASE_TIME,
    payload: value,
  };
};

export const updateTime = () => {
  return (dispatch, getState) => {
    const { totalSecond } = getState().time;
    dispatch(setCurrentTime(totalSecond + 1));
  };
};
