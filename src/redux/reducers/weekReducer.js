import {
  SET_SELECTED_INDEX,
  SET_NOW_INDEX,
  SET_DAYS,
  LOADING_DAY_TOTAL_TIMES,
  SET_DAY_TOTAL_TIMES,
  LOADING_TIMES,
  SET_TIMES,
  SET_WEEK_TOTAL_TIME,
  SET_SELECTED_TIME,
  SET_NEAREST_TIMES,
} from "../actions/actionType";
import { getDaysOfWeek } from "../../utils/Utils";

const initialState = {
  selectedIndex: -1,
  nowIndex: -1,
  days: getDaysOfWeek(new Date()),
  dayTotalTimes: [],
  isLoadingTimes: false,
  isLoadingTotalTimes: false,
  times: [],
  weekTotalTime: 0,
  selectedTime: null,
  preNearestTime: null,
  nextNearestTime: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SELECTED_INDEX:
      return {
        ...state,
        selectedIndex: payload,
      };
    case SET_NOW_INDEX:
      return {
        ...state,
        nowIndex: payload,
      };
    case SET_DAYS:
      return {
        ...state,
        days: payload,
      };
    case LOADING_DAY_TOTAL_TIMES:
      return {
        ...state,
        isLoadingTotalTimes: true,
      };
    case SET_DAY_TOTAL_TIMES:
      return {
        ...state,
        isLoadingTotalTimes: false,
        dayTotalTimes: payload,
      };
    case LOADING_TIMES:
      return {
        ...state,
        isLoadingTimes: true,
      };
    case SET_TIMES:
      return {
        ...state,
        isLoadingTimes: false,
        times: payload,
      };
    case SET_WEEK_TOTAL_TIME:
      return {
        ...state,
        weekTotalTime: payload,
      };
    case SET_SELECTED_TIME:
      return {
        ...state,
        selectedTime: payload,
      };
    case SET_NEAREST_TIMES:
      return {
        ...state,
        preNearestTime: payload.pre,
        nextNearestTime: payload.next,
      };
    default:
      return state;
  }
};
