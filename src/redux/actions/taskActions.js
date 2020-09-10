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

export const fetchTasks = () => {
  return async (dispatch) => {
    const response = await timeCloudAPI.get(`projects/1/tasks`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InZhbmhpZXAwMCIsImlhdCI6MTU5OTcyMTI3NSwiZXhwIjoxNjAwNTg1Mjc1fQ.3F9ZfEa3jJ5IV-hex3YXPzjzDOy2UOCHOsfqvxBq05w",
      },
    });
    console.log(response);
    dispatch(fetchTasksSuccess(1));
  };
};
