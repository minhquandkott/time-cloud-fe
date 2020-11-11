import {
  TIME_START,
  TIME_END,
  INCREASE_TIME,
  START_SAVING_TIME,
  SAVING_TIME_FAIL,
  SELECT_TASK,
  TIME_SET_DESCRIPTION,
  SET_BEGIN_TIME,
  SET_LAST_TIME_CURRENT_DAY,
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
  lastTimeCurrentDay: null,
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
    case SET_BEGIN_TIME:
      return {
        ...state,
        beginTime: payload.beginTime,
        totalSecond: payload.totalSecond,
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
    case SET_LAST_TIME_CURRENT_DAY:
      return {
        ...state,
        lastTimeCurrentDay: payload,
      };
    default:
      return state;
  }
};
