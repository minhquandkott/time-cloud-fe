import {
  FETCH_PROJECTS_FAIL,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_START,
} from "./actionType";
import timeCloudAPI from "../../apis/timeCloudAPI";

export const startFetchProject = () => {
  return {
    type: FETCH_PROJECTS_START,
  };
};

export const fetchProjects = (userId) => {
  return async (dispatch) => {
    dispatch(startFetchProject());
    try {
      const response = await timeCloudAPI.get(`users/60/projects`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InZhbmhpZXAwMCIsImlhdCI6MTU5OTcyMTI3NSwiZXhwIjoxNjAwNTg1Mjc1fQ.3F9ZfEa3jJ5IV-hex3YXPzjzDOy2UOCHOsfqvxBq05w",
        },
      });
      dispatch(fetchProjectsSuccess(response.data));
    } catch (error) {
      console.log(error.response);
      dispatch(fetchProjectsFail(2));
    }
  };
};

export const fetchProjectsSuccess = (projects) => {
  return {
    type: FETCH_PROJECTS_SUCCESS,
    payload: projects,
  };
};

export const fetchProjectsFail = (errorMessage) => {
  return {
    type: FETCH_PROJECTS_FAIL,
    payload: errorMessage,
  };
};
