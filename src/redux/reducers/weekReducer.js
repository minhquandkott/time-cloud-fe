import actions from 'redux-form/lib/actions';
import {
    GET_CURRENT_WEEK,
    NEXT_WEEK,
    LAST_WEEK,
    DAY_SELECTED,
    FETCH_TOTAL_TIME_DAY_SELECTED_SUCCESS,
    FETCH_TOTAL_TIME_DAY_SELECTED_FAIL,
    FETCH_TOTAL_TIME_DAY_SELECTED_START
} from '../actions/actionType';

const initialState = {
    firstDay : null,
    lastDay : null,
    selectedDay: null,
    isLoading: false,
    selectedIndex: -1,
    listTimeOfSelectedDay: [],
    error: []
}

export default (state = initialState, {type, payload}) => {
    switch(type) {
        case GET_CURRENT_WEEK:     
            return {
                ...state,
                firstDay: payload.firstDay,
                lastDay: payload.lastDay
            }
        case NEXT_WEEK:
            return {
                ...state,
                firstDay: payload.firstDay,
                lastDay: payload.lastDay
            }
        case LAST_WEEK:            
            return {
                ...state,
                firstDay: payload.firstDay,
                lastDay: payload.lastDay
            }
        case DAY_SELECTED:
            return {
                ...state,
                selectedDay: payload.selectedDay,
                selectedIndex: payload.selectedIndex
            }
        case FETCH_TOTAL_TIME_DAY_SELECTED_START:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_TOTAL_TIME_DAY_SELECTED_SUCCESS:
            return {
                ...state,
                listTimeOfSelectedDay : payload,
                isLoading: false
            }
        case FETCH_TOTAL_TIME_DAY_SELECTED_FAIL:
            return {
                ...state,
                error: payload,
                isLoading: false
            }
        default:
            return state;
    }
}