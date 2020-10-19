import {
  TIME_START,
  TIME_END,
  INCREASE_TIME,
  START_SAVING_TIME,
  SAVING_TIME_FAIL,
  SELECT_TASK,
  TIME_SET_DESCRIPTION,
} from "../actions/actionType";

const initialState = {
  beginTime: null,
  isCounting: false,
  intervalId: null,
  totalSecond: 0,
  isSaving: false,
  errorMessage: null,
  selectedTask: null,
  description: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TIME_START:
      return {
        ...state,
        isCounting: true,
        ...payload,
      };
    case TIME_END:
      return {
        ...initialState,
      };
    case INCREASE_TIME:
      return {
        ...state,
        totalSecond: state.totalSecond + payload,
      };
    case SELECT_TASK:
      return {
        ...state,
        selectedTask: payload,
      };
    case TIME_SET_DESCRIPTION:
      return {
        ...state,
        description: payload,
      };
    case START_SAVING_TIME:
      return {
        ...state,
        isSaving: true,
      };
    case SAVING_TIME_FAIL:
      return {
        ...state,
        isSaving: false,
        errorMessage: payload,
      };
    default:
      return state;
  }
};
