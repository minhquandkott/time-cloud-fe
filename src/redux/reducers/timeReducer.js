import {
  TIME_START,
  TIME_END,
  TIME_SET_INTERVAL_ID,
  STOP_COUNTING_TIME,
  INCREASE_TIME,
  START_SAVING_TIME,
  SAVING_TIME_SUCCESS,
  SAVING_TIME_FAIL,
  SELECT_TASK,
} from "../actions/actionType";

const initialState = {
  beginTime: null,
  endTime: null,
  isCounting: false,
  intervalId: null,
  totalSecond: 0,
  isSaving: false,
  isSavingSuccess: false,
  errorMessage: null,
  selectedTask: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TIME_START:
      return {
        ...state,
        isCounting: true,
        beginTime: payload.beginTime,
        preCountingTime: payload.preCountingTime,
      };
    case SELECT_TASK:
      return {
        ...state,
        ...initialState,
        selectedTask: payload,
      };
    case TIME_END:
      return {
        ...state,
        endTime: payload.endTime,
        isCounting: false,
        intervalId: null,
      };
    case TIME_SET_INTERVAL_ID:
      return {
        ...state,
        intervalId: payload,
      };
    case STOP_COUNTING_TIME:
      return {
        ...state,
        isCounting: false,
      };
    case INCREASE_TIME:
      return {
        ...state,
        totalSecond: payload,
      };
    case START_SAVING_TIME:
      return {
        ...state,
        isSaving: true,
      };
    case SAVING_TIME_SUCCESS:
      return {
        ...initialState,
        isSaving: false,
        isSavingSuccess: true,
      };
    case SAVING_TIME_FAIL:
      return {
        ...state,
        isSaving: false,
        errorMessage: payload,
        isSavingSuccess: false,
      };
    default:
      return state;
  }
};
