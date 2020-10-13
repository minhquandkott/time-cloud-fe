import {
  FETCH_TASKS_FAIL,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_START,
} from "./actionType";
import timeCloudAPI from "../../apis/timeCloudAPI";
import { fetchProjectsSuccess } from "../actions";

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
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const { data } = await timeCloudAPI().get(
      `projects/${projectId}/users/${userId}/tasks`
    );
    dispatch(fetchTasksSuccess(data));
    // const { tasks } = getState().tasks;
    // const { projects } = getState().projects;
    // const i = projects.findIndex((project, index) => {
    //   console.log(
    //     tasks.filter((task) => task.projectId === project.id).length,
    //     index
    //   );
    //   return (
    //     tasks.filter((task) => task.projectId === project.id).length <
    //     data.length
    //   );
    // });
    // const projectIndex = projects.findIndex((e) => e.id === projectId);
    // const project = projects[projectIndex];
    // projects.splice(projectIndex, 1);
    // projects.splice(i, 0, project);
    // console.log(projectId, i, projects);
    // dispatch(fetchProjectsSuccess([...projects]));
  };
};
