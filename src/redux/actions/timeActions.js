import {
  TIME_END,
  TIME_START,
  SET_TIME_INFO,
  INCREASE_TIME,
  START_SAVING_TIME,
  SAVING_TIME_SUCCESS,
  SAVING_TIME_FAIL,
  SELECT_TASK,
} from "./actionType";
import {
  SELECTED_TASK_ID,
  DESCRIPTION,
  BEGIN_TIME,
} from "../../utils/localStorageContact";
import timeCloudAPI from "../../apis/timeCloudAPI";
import { fetchTimes, selectTime } from "./index";

export const beginCountingTime = (
  beginTime,
  intervalId,
  description,
  totalSecond = 0,
  endTime
) => {
  return {
    type: TIME_START,
    payload: {
      beginTime,
      intervalId,
      description,
      totalSecond,
      endTime,
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
      const totalSecond = Math.ceil((new Date().getTime() - beginTime) / 1000);
      dispatch(fetchTask(selectedTaskId));
      const intervalId = window.setInterval(() => {
        dispatch(increaseTime(1));
      }, 1000);
      dispatch(
        beginCountingTime(beginTime, intervalId, description, totalSecond)
      );
    }
  };
};
// export const savingTimeSuccess = () => {
//   return {
//     type: SAVING_TIME_SUCCESS,
//   };
// };
// export const savingTimeFail = (errorMessage) => {
//   return {
//     type: SAVING_TIME_FAIL,
//     payload: errorMessage,
//   };
// };

export const saveTime = (description) => {
  return async (dispatch, getState) => {
    dispatch(startSavingTime());
    const { id } = getState().time.selectedTask;
    const { userId } = getState().auth;
    const { endTime, totalSecond } = getState().time;
    const convertedBeginTime = endTime - totalSecond * 1000;

    try {
      await timeCloudAPI().post(`tasks/${id}/times`, {
        description,
        mileSecondEndTime: endTime,
        mileSecondStartTime: convertedBeginTime,
      });
      localStorage.removeItem(SELECTED_TASK_ID);
      localStorage.removeItem(BEGIN_TIME);
      // dispatch(savingTimeSuccess());
      dispatch(fetchTimes(userId));
      dispatch(selectTime(null));
    } catch (error) {
      console.log(error);
      // dispatch(savingTimeFail(error.response.message));
    }
  };
};
