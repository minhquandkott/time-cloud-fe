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
} from "./actionType";
import timeCloudAPI from "../../apis/timeCloudAPI";
import {
  getDaysOfWeek,
  checkDayInWeekNow,
  convertDate,
  equalDates,
} from "../../utils/Utils";

export const setSelectedIndex = (index) => {
  return {
    type: SET_SELECTED_INDEX,
    payload: index,
  };
};

const setNowIndex = (index) => {
  return {
    type: SET_NOW_INDEX,
    payload: index,
  };
};

const setDays = (days) => {
  return {
    type: SET_DAYS,
    payload: days,
  };
};

const setDaysTotalTimes = (totalTimes) => {
  return {
    type: SET_DAY_TOTAL_TIMES,
    payload: totalTimes,
  };
};

export const setTimes = (times) => {
  return {
    type: SET_TIMES,
    payload: times.sort((time1, time2) => {
      return new Date(time1.startTime) - new Date(time2.startTime);
    }),
  };
};

const setWeekTotalTime = (totalTime) => {
  return {
    type: SET_WEEK_TOTAL_TIME,
    payload: totalTime,
  };
};

export const getWeek = (date) => {
  return (dispatch) => {
    const temp = getDaysOfWeek(date);
    const index = temp.findIndex((ele) => equalDates(ele, date));
    dispatch(setDays(temp));
    dispatch(setSelectedIndex(index));
    dispatch(setNowIndex(index));
    dispatch(fetchDayTotalTimes());
    dispatch(fetchTimesOfSelectedDay());
  };
};

export const editTimeOfListTime = (time) => {
  return (dispatch, getState) => {
    const { times } = getState().week;
    dispatch(setTimes(times.map((ele) => (ele.id === time.id ? time : ele))));
  };
};

export const getPreWeek = () => {
  return (dispatch, getState) => {
    const { days } = getState().week;
    const firstDay = new Date(days[0]);
    firstDay.setDate(firstDay.getDate() - 7);
    const temp = getDaysOfWeek(firstDay);
    dispatch(setDays(temp));
    dispatch(setSelectedIndex(0));
    dispatch(fetchTimesOfSelectedDay());
    dispatch(fetchDayTotalTimes());
  };
};
export const getNextWeek = () => {
  return (dispatch, getState) => {
    const { days } = getState().week;
    const check = checkDayInWeekNow(days[0]);
    if (check === -1) {
      const temp = new Date(days[6]);
      temp.setDate(temp.getDate() + 1);
      const nextDays = getDaysOfWeek(temp);
      dispatch(setDays(nextDays));
      if (checkDayInWeekNow(temp) === -1) {
        dispatch(setSelectedIndex(0));
      } else {
        const index = nextDays.findIndex(
          (ele) => ele.toDateString() === new Date().toDateString()
        );
        dispatch(setSelectedIndex(index));
        dispatch(setNowIndex(index));
      }
      dispatch(fetchTimesOfSelectedDay());
      dispatch(fetchDayTotalTimes());
    }
  };
};

export const fetchTimesOfSelectedDay = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: LOADING_TIMES,
    });
    const { selectedIndex, days } = getState().week;
    const day = days[selectedIndex];
    const res = await timeCloudAPI().get(
      `users/${localStorage.getItem("userId")}/times?date=${convertDate(day)}`
    );
    dispatch(setTimes(res.data));
  };
};

// * Fetch method -----------------

export const fetchTotalTimeDay = async (date) => {
  let dateURL = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  const res = await timeCloudAPI().get(
    `users/${localStorage.getItem("userId")}/date/${dateURL}/total-times`
  );
  return res.data;
};

export const fetchTotalTimeWeek = async (dayInWeek) => {
  const stringDate = `${dayInWeek.getFullYear()}-${
    dayInWeek.getMonth() + 1
  }-${dayInWeek.getDate()}`;
  const res = await timeCloudAPI().get(
    `users/${localStorage.getItem("userId")}/week/${stringDate}/total-times`
  );
  return res.data;
};

export const fetchDayTotalTimes = () => {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING_DAY_TOTAL_TIMES });
    const { days } = getState().week;
    const res = await Promise.all([
      ...days.map((day) => fetchTotalTimeDay(day)),
      fetchTotalTimeWeek(days[0]),
    ]);
    const weekTotalTime = res.pop();
    dispatch(setWeekTotalTime(weekTotalTime));
    dispatch(setDaysTotalTimes(res));
  };
};

export const selectDay = (index) => {
  return async (dispatch) => {
    dispatch(setSelectedIndex(index));
    dispatch(fetchTimesOfSelectedDay());
  };
};

//* Selected Week ---------------------

export const removeTimeOfSelectedDay = (time) => {
  return (dispatch, getState) => {
    const {
      times,
      weekTotalTime,
      dayTotalTimes,
      selectedIndex,
    } = getState().week;
    const removedTotalTime =
      (new Date(time.endTime) - new Date(time.startTime)) / 1000;
    const temp = dayTotalTimes.map((ele, index) => {
      if (index === selectedIndex) return ele - removedTotalTime;
      return ele;
    });
    dispatch(setTimes(times.filter((ele) => ele.id !== time.id)));
    dispatch(setWeekTotalTime(weekTotalTime - removedTotalTime));
    dispatch(setDaysTotalTimes(temp));
  };
};

export const addTimeOfSelectedDay = (time) => {
  return (dispatch, getState) => {
    const {
      times,
      weekTotalTime,
      dayTotalTimes,
      selectedIndex,
      nowIndex,
      days,
    } = getState().week;
    const selectedDay = days[selectedIndex];
    const daysNow = getDaysOfWeek(new Date());
    if (daysNow.some((day) => equalDates(selectedDay, day))) {
      const addedTotalTime =
        (new Date(time.endTime) - new Date(time.startTime)) / 1000;
      const temp = dayTotalTimes.map((ele, index) => {
        if (index === nowIndex) return ele + addedTotalTime;
        return ele;
      });
      dispatch(setWeekTotalTime(weekTotalTime + addedTotalTime));
      dispatch(setDaysTotalTimes(temp));
      if (equalDates(selectedDay, new Date())) {
        dispatch(setTimes([...times, time]));
      }
    }
  };
};

export const updateTimeOfSelectedDay = (time) => {
  return (dispatch, getState) => {
    const {
      weekTotalTime,
      dayTotalTimes,
      selectedIndex,
      selectedTime,
    } = getState().week;
    const removedTotalTime =
      (new Date(selectedTime.endTime) - new Date(selectedTime.startTime)) /
      1000;
    const addedTotalTime =
      (new Date(time.endTime) - new Date(time.startTime)) / 1000;
    const temp = dayTotalTimes.map((ele, index) => {
      if (index === selectedIndex)
        return ele - removedTotalTime + addedTotalTime;
      return ele;
    });
    dispatch(
      setWeekTotalTime(weekTotalTime - removedTotalTime + addedTotalTime)
    );
    dispatch(setDaysTotalTimes(temp));
  };
};

// * ------------------------------

export const setSelectedTime = (time) => {
  return {
    type: SET_SELECTED_TIME,
    payload: time,
  };
};

export const getNearestTime = (time) => {
  return (dispatch, getState) => {
    const { times } = getState().week;
    const index = times.findIndex((ele) => ele.id === time.id);

    dispatch({
      type: SET_NEAREST_TIMES,
      payload: {
        pre: index ? times[index - 1] : null,
        next: index === times.length - 1 ? null : times[index + 1],
      },
    });
  };
};
