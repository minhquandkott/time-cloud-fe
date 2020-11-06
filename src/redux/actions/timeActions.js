import {
  TIME_END,
  TIME_START,
  INCREASE_TIME,
  START_SAVING_TIME,
  SAVING_TIME_FAIL,
  SELECT_TASK,
  TIME_SET_DESCRIPTION,
} from "./actionType";
import {
  SELECTED_TASK_ID,
  DESCRIPTION,
  BEGIN_TIME,
} from "../../utils/localStorageContact";
import timeCloudAPI from "../../apis/timeCloudAPI";
import { fetchTimes, selectTime } from "./index";

export const beginCountingTime = (beginTime, intervalId, totalSecond = 0) => {
  return {
    type: TIME_START,
    payload: {
      beginTime,
      intervalId,
      totalSecond,
    },
  };
};

export const endCountingTime = () => {
  return (dispatch, getState) => {
    const { intervalId } = getState().time;
    clearInterval(intervalId);
    dispatch({ type: TIME_END });
  };
};

export const increaseTime = (step) => {
  return {
    type: INCREASE_TIME,
    payload: step,
  };
};

export const setDescription = (description) => {
  return {
    type: TIME_SET_DESCRIPTION,
    payload: description,
  };
};

export const selectTask = (task) => {
  return {
    type: SELECT_TASK,
    payload: task,
  };
};

export const startSavingTime = () => {
  return {
    type: START_SAVING_TIME,
  };
};

export const fetchTask = (taskId) => {
  return async (dispatch) => {
    try {
      const response = await timeCloudAPI().get(`tasks/${taskId}`);
      dispatch(selectTask(response.data));
    } catch (error) {}
  };
};

export const checkTime = () => {
  return (dispatch) => {
    const { beginTime, description, selectedTaskId } = localStorage;
    if (beginTime && selectedTaskId) {
      console.log(beginTime);
      const totalSecond = Math.ceil(
        (new Date().getTime() - new Date(beginTime)) / 1000
      );
      dispatch(fetchTask(selectedTaskId));
      dispatch(setDescription(description || ""));
      const intervalId = window.setInterval(() => {
        dispatch(increaseTime(1));
      }, 1000);
      dispatch(beginCountingTime(beginTime, intervalId, totalSecond));
    }
  };
};

export const saveTime = () => {
  return async (dispatch, getState) => {
    dispatch(startSavingTime());
    const { id } = getState().time.selectedTask;
    const { userId } = getState().auth;
    const { beginTime, description } = getState().time;
    try {
      const res = await timeCloudAPI().post(`tasks/${id}/times`, {
        description,
        mileSecondEndTime: new Date().getTime(),
        mileSecondStartTime: new Date(beginTime).getTime(),
      });
      localStorage.removeItem(SELECTED_TASK_ID);
      localStorage.removeItem(BEGIN_TIME);
      localStorage.removeItem(DESCRIPTION);
      dispatch(fetchTimes(userId));
      dispatch(selectTime(null));
      dispatch(endCountingTime());
      return res;
    } catch (error) {
      dispatch(savingTimeFail(error.response.data.message));
    }
  };
};

export const savingTimeFail = (errorMessage) => {
  return {
    type: SAVING_TIME_FAIL,
    payload: errorMessage,
  };
};
