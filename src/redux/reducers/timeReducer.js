import {
  TIME_START,
  TIME_END,
  TIME_SET_INTERVAL_ID,
} from "../actions/actionType";

const initialState = {
  beginTime: null,
  endTime: null,
  isCounting: false,
  totalSecond: 0,
  intervalId: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TIME_START:
      return {
        ...state,
        isCounting: true,
        beginTime: payload.beginTime,
      };
    case TIME_END:
      return {
        ...state,
        endTime: payload.endTime,
        isCounting: false,
        totalSecond: payload.endTime - state.beginTime,
        intervalId: null,
      };
    case TIME_SET_INTERVAL_ID:
      return {
        ...state,
        intervalId: payload,
      };
    default:
      return state;
  }
};
