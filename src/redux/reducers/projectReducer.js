import {
  FETCH_PROJECTS_FAIL,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_START,
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
    default:
      return state;
  }
};
