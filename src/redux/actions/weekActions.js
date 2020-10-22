import {
    NEXT_WEEK,
    LAST_WEEK,
    GET_CURRENT_WEEK
} from './actionType';

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
    console.log(1);
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
    console.log(21);
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
