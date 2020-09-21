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
  return async (dispatch, getState) => {
    const { auth } = getState();
    dispatch(startFetchProject());
    try {
      const response = await timeCloudAPI().get(`users/67/projects`);
      dispatch(fetchProjectsSuccess(response.data));
    } catch (error) {
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
