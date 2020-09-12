import {
  TIME_START,
  TIME_END,
  TIME_SET_INTERVAL_ID,
  STOP_COUNTING_TIME,
  INCREASE_TIME,
} from "../actions/actionType";

const initialState = {
  beginTime: null,
  endTime: null,
  isCounting: false,
  intervalId: null,
  totalSecond: 0,
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
    default:
      return state;
  }
};
