import actions from 'redux-form/lib/actions';
import {
    GET_CURRENT_WEEK,
    NEXT_WEEK,
    LAST_WEEK
} from '../actions/actionType';

const initialState = {
    firstDay : null,
    lastDay : null,
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
        default:
            return state;
    }
}