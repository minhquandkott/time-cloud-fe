import {
  FETCH_TASKS_FAIL,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_START,
} from "./actionType";
import timeCloudAPI from "../../apis/timeCloudAPI";

export const startFetchTasks = () => {
  return {
    type: FETCH_TASKS_START,
  };
};

export const fetchTasksSuccess = (tasks) => {
  return {
    type: FETCH_TASKS_SUCCESS,
    payload: tasks,
  };
};

export const fetchTasksFail = (errorMassage) => {
  return {
    type: FETCH_TASKS_FAIL,
    payload: errorMassage,
  };
};

export const fetchTasks = (projectId) => {
  return async (dispatch) => {
    const response = await timeCloudAPI().get(`projects/${projectId}/tasks`);
    dispatch(fetchTasksSuccess(response.data));
  };
};
