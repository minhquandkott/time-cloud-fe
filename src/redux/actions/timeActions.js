import {
  TIME_END,
  TIME_START,
  TIME_SET_INTERVAL_ID,
  STOP_COUNTING_TIME,
  INCREASE_TIME,
  START_SAVING_TIME,
  SAVING_TIME_SUCCESS,
  SAVING_TIME_FAIL,
  SELECT_TASK,
} from "./actionType";
import { SELECTED_TASK_ID, BEGIN_TIME } from "../../utils/localStorageContact";
import timeCloudAPI from "../../apis/timeCloudAPI";

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

export const createTime = () => {
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

export const startSavingTime = () => {
  return {
    type: START_SAVING_TIME,
  };
};

export const savingTimeSuccess = () => {
  return {
    type: SAVING_TIME_SUCCESS,
  };
};
export const savingTimeFail = (errorMessage) => {
  return {
    type: SAVING_TIME_FAIL,
    payload: errorMessage,
  };
};

export const saveTime = (description) => {
  return async (dispatch, getState) => {
    dispatch(startSavingTime());
    const { id } = getState().time.selectedTask;
    const { endTime, totalSecond } = getState().time;
    const convertedBeginTime = endTime - totalSecond;

    try {
      const response = await timeCloudAPI.post(
        `tasks/${id}/times`,
        {
          description,
          mileSecondEndTime: endTime,
          mileSecondStartTime: convertedBeginTime,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InZhbmhpZXAwMCIsImlhdCI6MTU5OTcyMTI3NSwiZXhwIjoxNjAwNTg1Mjc1fQ.3F9ZfEa3jJ5IV-hex3YXPzjzDOy2UOCHOsfqvxBq05w",
            userId: 67,
          },
        }
      );
      localStorage.removeItem(SELECTED_TASK_ID);
      localStorage.removeItem(BEGIN_TIME);
      console.log(response);
      dispatch(savingTimeSuccess());
    } catch (error) {
      console.log(error);
      dispatch(savingTimeFail(error.response.message));
    }
  };
};

export const fetchTask = (taskId) => {
  return async (dispatch) => {
    try {
      const response = await timeCloudAPI.get(`tasks/${taskId}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InZhbmhpZXAwMCIsImlhdCI6MTU5OTcyMTI3NSwiZXhwIjoxNjAwNTg1Mjc1fQ.3F9ZfEa3jJ5IV-hex3YXPzjzDOy2UOCHOsfqvxBq05w",
        },
      });
      dispatch(selectTask(response.data));
    } catch (error) {}
  };
};

export const selectTask = (task) => {
  return (dispatch, getState) => {
    const intervalId = getState().time.intervalId;
    clearInterval(intervalId);
    dispatch({
      type: SELECT_TASK,
      payload: task,
    });
  };
};
