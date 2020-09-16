import {
  FETCH_TIMES_START,
  FETCH_TIMES_SUCCESS,
  FETCH_TIMES_FAIL,
  SELECT_TIME,
} from "../actions/actionType";

const initialState = {
  times: [],
  isLoading: false,
  errorMessage: null,
  selectedTime: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TIMES_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_TIMES_SUCCESS:
      return {
        ...state,
        times: payload,
        isLoading: false,
      };
    case FETCH_TIMES_FAIL:
      return {
        ...state,
        errorMessage: payload,
        isLoading: false,
      };
    case SELECT_TIME:
      return {
        ...state,
        selectedTime: payload,
      };
    default:
      return state;
  }
};
