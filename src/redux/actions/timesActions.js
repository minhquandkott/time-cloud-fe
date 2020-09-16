import {
  FETCH_TIMES_START,
  FETCH_TIMES_SUCCESS,
  FETCH_TIMES_FAIL,
  SELECT_TIME,
} from "./actionType";
import timeCloudAPI from "../../apis/timeCloudAPI";

const startFetchTimes = () => {
  return {
    type: FETCH_TIMES_START,
  };
};

const fetchTimesSuccess = (times) => {
  return {
    type: FETCH_TIMES_SUCCESS,
    payload: times,
  };
};

const fetchTimesFail = (errorMessage) => {
  return {
    type: FETCH_TIMES_FAIL,
    payload: errorMessage,
  };
};

export const selectTime = (time) => {
  return {
    type: SELECT_TIME,
    payload: time,
  };
};

export const fetchTimes = (userId) => {
  return async (dispatch) => {
    dispatch(startFetchTimes());
    try {
      const response = await timeCloudAPI.get(`users/${userId}/times`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InZhbmhpZXAwMCIsImlhdCI6MTU5OTcyMTI3NSwiZXhwIjoxNjAwNTg1Mjc1fQ.3F9ZfEa3jJ5IV-hex3YXPzjzDOy2UOCHOsfqvxBq05w",
        },
      });
      dispatch(fetchTimesSuccess(response.data));
    } catch (error) {
      console.log(error);
      //dispatch(fetchTimesFail(error.response.errorMessage));
    }
  };
};
