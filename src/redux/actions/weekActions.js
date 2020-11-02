import {
  NEXT_WEEK,
  LAST_WEEK,
  GET_CURRENT_WEEK,
  DAY_SELECTED,
  FETCH_TOTAL_TIME_DAY_SELECTED_SUCCESS,
  FETCH_TOTAL_TIME_DAY_SELECTED_FAIL,
  FETCH_TOTAL_TIME_DAY_SELECTED_START,
  REMOVE_TIME_SELECTED_DAY,
  SET_TOTAL_TIME_CURRENT_DAY,
  SET_TOTAL_TIME_CURRENT_WEEK,
} from "./actionType";
import timeCloudAPI from "../../apis/timeCloudAPI";

export const getCurrentWeek = () => {
  let curr = new Date();
  let first;
  if (curr.getDay() === 0) {
    first = curr.getDate() - 6;
  } else {
    first = curr.getDate() - (curr.getDay() - 1);
  }
  let firstDay = new Date(curr.setDate(first));
  var lastDay = new Date(curr.setDate(curr.getDate() + 6));
  return {
    type: GET_CURRENT_WEEK,
    payload: {
      firstDay,
      lastDay,
    },
  };
};

export const getNextWeek = (lastDay) => {
  let nextMonday = new Date(lastDay.setDate(lastDay.getDate() + 1));
  let nextSunday = new Date(lastDay.setDate(lastDay.getDate() + 6));
  return {
    type: NEXT_WEEK,
    payload: {
      firstDay: nextMonday,
      lastDay: nextSunday,
    },
  };
};

export const getLastWeek = (firstDay) => {
  let sunday = new Date(firstDay.setDate(firstDay.getDate() - 1));
  let monday = new Date(firstDay.setDate(firstDay.getDate() - 6));
  return {
    type: LAST_WEEK,
    payload: {
      firstDay: monday,
      lastDay: sunday,
    },
  };
};

export const setDaySelected = (date, index) => {
  return {
    type: DAY_SELECTED,
    payload: {
      selectedDay: date,
      selectedIndex: index,
    },
  };
};

export const removeTimeSelectedDay = (time) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_TIME_SELECTED_DAY,
      payload: time,
    });
    const totalTime =
      (new Date(time.endTime) - new Date(time.startTime)) / 1000;
    dispatch(deleteTotalTimeCurrentDay(totalTime));
    dispatch(deleteTotalTimeCurrentWeek(totalTime));
  };
};

export const fetchTotalTimeDaySelected = (day) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_TOTAL_TIME_DAY_SELECTED_START,
    });
    const res = await timeCloudAPI().get(
      `users/${localStorage.getItem("userId")}/times?date=${day}`
    );
    let times = res.data;
    dispatch(fetchTotalTimeDaySelectedSuccess(times));
  };
};

export const fetchTotalTimeDaySelectedSuccess = (times) => {
  return {
    type: FETCH_TOTAL_TIME_DAY_SELECTED_SUCCESS,
    payload: times,
  };
};
const fetchTotalTimeDaySelectedFail = (error) => {
  return {
    type: FETCH_TOTAL_TIME_DAY_SELECTED_FAIL,
    payload: error,
  };
};

const setTotalTimeCurrentDay = (totalTimeCurrentDay) => {
  return {
    type: SET_TOTAL_TIME_CURRENT_DAY,
    payload: totalTimeCurrentDay,
  };
};

export const fetchTotalTimeCurrentDay = () => {
  return async (dispatch) => {
    const date = new Date();
    let dateURL = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    const res = await timeCloudAPI().get(
      `users/${localStorage.getItem("userId")}/date/${dateURL}/total-times`
    );
    dispatch(setTotalTimeCurrentDay(res.data));
  };
};

export const addTotalTimeCurrentDay = (addedTotalTime) => {
  return (dispatch, getState) => {
    const { totalTimeCurrentDay } = getState().week;
    const temp = addedTotalTime + totalTimeCurrentDay;
    dispatch(setTotalTimeCurrentDay(temp));
  };
};
export const deleteTotalTimeCurrentDay = (deletedTotalTime) => {
  return (dispatch, getState) => {
    const { totalTimeCurrentDay } = getState().week;
    const temp = totalTimeCurrentDay - deletedTotalTime;
    dispatch(setTotalTimeCurrentDay(temp));
  };
};

const setTotalTimeCurrentWeek = (totalTimeCurrentWeek) => {
  return {
    type: SET_TOTAL_TIME_CURRENT_WEEK,
    payload: totalTimeCurrentWeek,
  };
};

export const fetchTotalTimeCurrentWeek = () => {
  return async (dispatch) => {
    const date = new Date();
    const stringDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    const res = await timeCloudAPI().get(
      `users/${localStorage.getItem("userId")}/week/${stringDate}/total-times`
    );
    dispatch(setTotalTimeCurrentWeek(res.data));
  };
};

export const addTotalTimeCurrentWeek = (addedTotalTime) => {
  return (dispatch, getState) => {
    const { totalTimeCurrentWeek } = getState().week;
    const temp = addedTotalTime + totalTimeCurrentWeek;
    dispatch(setTotalTimeCurrentWeek(temp));
  };
};

export const deleteTotalTimeCurrentWeek = (deletedTotalTime) => {
  return (dispatch, getState) => {
    const { totalTimeCurrentWeek } = getState().week;
    const temp = totalTimeCurrentWeek - deletedTotalTime;
    dispatch(setTotalTimeCurrentWeek(temp));
  };
};
