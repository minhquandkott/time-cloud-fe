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
  isCounting: false,
  intervalId: null,
  totalSecond: 0,
  isSaving: false,
  isSavingSuccess: false,
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

    // case TIME_SET_INTERVAL_ID:
    //   return {
    //     ...state,
    //     intervalId: payload,
    //   };
    // case STOP_COUNTING_TIME:
    //   return {
    //     ...state,
    //     isCounting: false,
    //   };
    // case START_SAVING_TIME:
    //   return {
    //     ...state,
    //     isSaving: true,
    //   };
    // case SAVING_TIME_SUCCESS:
    //   return {
    //     ...initialState,
    //     isSaving: false,
    //     isSavingSuccess: true,
    //   };
    // case SAVING_TIME_FAIL:
    //   return {
    //     ...state,
    //     isSaving: false,
    //     errorMessage: payload,
    //     isSavingSuccess: false,
    //   };
    default:
      return state;
  }
};
