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
      const map = new Map();
      state.tasks.forEach((task) => map.set(task.id, task));
      payload.forEach((task) => map.set(task.id, task));
      return {
        ...state,
        isFetching: false,
        tasks: [...map.values()],
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
