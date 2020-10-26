import {
    NEXT_WEEK,
    LAST_WEEK,
    GET_CURRENT_WEEK,
    DAY_SELECTED,
    FETCH_TOTAL_TIME_DAY_SELECTED_SUCCESS,
    FETCH_TOTAL_TIME_DAY_SELECTED_FAIL,
    FETCH_TOTAL_TIME_DAY_SELECTED_START
} from './actionType';
import timeCloudAPI from '../../apis/timeCloudAPI';

export const getCurrentWeek = () => {
    let curr = new Date();
    let first = curr.getDate() - curr.getDay() + 1;
    let firstDay = new Date(curr.setDate(first));
    var lastDay = new Date(curr.setDate(curr.getDate()+6));
    return {
        type: GET_CURRENT_WEEK,
        payload: {
            firstDay,
            lastDay
        }
    }
}

export const getNextWeek = (lastDay) => {
    let nextMonday = new Date(lastDay.setDate(lastDay.getDate() + 1));
    let nextSunday = new Date(lastDay.setDate(lastDay.getDate() + 6));
    return {
        type: NEXT_WEEK,
        payload: {
            firstDay: nextMonday,
            lastDay: nextSunday
        }
    }
}

export const getLastWeek = (firstDay) => {
    let sunday = new Date(firstDay.setDate(firstDay.getDate() - 1));
    let monday = new Date(firstDay.setDate(firstDay.getDate() - 6));
    return {
        type: LAST_WEEK,
        payload: {
            firstDay: monday,
            lastDay: sunday
        }
    }
}

export const setDaySelected = (date, index) => {
    return {
        type: DAY_SELECTED,
        payload: {
            selectedDay: date,
            selectedIndex: index
        }
    }
}

export const fetchTotalTimeDaySelected = (day) => {
    return async dispatch => {
        dispatch({
            type:FETCH_TOTAL_TIME_DAY_SELECTED_START
        })
        const res = await timeCloudAPI()
        .get(`users/${localStorage.getItem("userId")}/times?date=${day}`)
        let times = res.data;
        dispatch(fetchTotalTimeDaySelectedSuccess(times))
    }
}

const fetchTotalTimeDaySelectedSuccess = (times) => {
    return {
        type: FETCH_TOTAL_TIME_DAY_SELECTED_SUCCESS,
        payload: times
    }
}
const fetchTotalTimeDaySelectedFail = (error) => {
    return {
        type: FETCH_TOTAL_TIME_DAY_SELECTED_FAIL,
        payload: error
    }
}
