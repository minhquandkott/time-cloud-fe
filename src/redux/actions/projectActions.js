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

export const fetchProjects = (userId, cancelToken) => {
  return async (dispatch) => {
    dispatch(startFetchProject());
    try {
      let res = await timeCloudAPI().get(
        `users/${userId}/project-user-available`,
        {
          cancelToken: cancelToken,
        }
      );
      const projects = res.data
        .sort((ele1, ele2) => ele1.index - ele2.index)
        .map((ele) => {
          return { ...ele.project, isShow: ele.isShow };
        });
      res = await Promise.all(
        projects.map((project) =>
          timeCloudAPI().get(`projects/${project.id}/users/${userId}/tasks`)
        )
      );
      dispatch(
        fetchProjectsSuccess(
          projects.map((ele, index) => {
            return { ...ele, tasks: res[index].data };
          })
        )
      );
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
