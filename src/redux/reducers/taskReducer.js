import {
  FETCH_TASKS_FAIL,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_START,
} from "../actions/actionType";
const initialState = {
  tasks: [],
  isFetching: false,
  errorMessage: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TASKS_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        tasks: [...state.tasks, ...payload],
      };
    case FETCH_TASKS_FAIL:
      return {
        ...state,
        isFetching: false,
        errorMessage: payload,
      };
    default:
      return state;
  }
};
