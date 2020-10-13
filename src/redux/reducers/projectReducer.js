import {
  FETCH_PROJECTS_FAIL,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_START,
  DELETE_PROJECTS_FAIL,
  DELETE_PROJECTS_SUCCESS,
  DELETE_PROJECTS_START,

} from "../actions/actionType";

const initialState = {
  projects: [],
  isFetching: false,
  errorMessage: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PROJECTS_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        projects: [...payload],
      };
    case FETCH_PROJECTS_FAIL:
      return {
        ...state,
        isFetching: false,
        errorMessage: payload,
      };
    case DELETE_PROJECTS_START:
      return {
        ...state,
        isFetching: true,
      };
      case DELETE_PROJECTS_SUCCESS:
        const temp = state.projects.filter(project => project.id !== payload)
        return {
          ...state,
          isFetching: false,
          projects: [...temp],
        };
      case DELETE_PROJECTS_FAIL:
        return {
          ...state,
          isFetching: false,
          errorMessage: payload,
        };
    default:
      return state;
  }
};
