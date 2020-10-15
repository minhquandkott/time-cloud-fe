import {
  FETCH_PROJECTS_FAIL,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_START,
  DELETE_PROJECTS_START,
  DELETE_PROJECTS_SUCCESS,
  DELETE_PROJECTS_FAIL,
} from "./actionType";
import timeCloudAPI from "../../apis/timeCloudAPI";

export const startFetchProject = () => {
  return {
    type: FETCH_PROJECTS_START,
  };
};

export const fetchProjects = (userId) => {
  return async (dispatch, getState) => {
    dispatch(startFetchProject());
    try {
      const response = await timeCloudAPI().get(`users/${userId}/projects`);
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

export const startDeleteProject = () => {
  return {
    type: DELETE_PROJECTS_START,
  };
};

export const deleteProjectsSuccess = (id) => {
  return {
    type: DELETE_PROJECTS_SUCCESS,
    payload: id,
  };
};

export const deleteProjectsFail = (errorMessage) => {
  return {
    type: DELETE_PROJECTS_FAIL,
    payload: errorMessage,
  };
};

export const deleteProjects = (id) => {
  return async (dispatch) => {
    console.log(id);
    try {
      await timeCloudAPI().delete(`projects/${id}`);
      //console.log(response);
      dispatch(deleteProjectsSuccess(id));
    } catch (error) {
      dispatch(deleteProjectsFail(2));
    }
  };
};
