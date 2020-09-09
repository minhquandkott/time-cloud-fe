import {
  AUTH_AUTHENTICATION,
  AUTH_FAIL,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_SET_REDIRECT_PATH,
} from "./actionType";
import timeCloudAPI from "../../apis/timeCloudAPI";
export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: AUTH_SUCCESS,
    payload: {
      token,
      userId,
    },
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    payload: error,
  };
};

export const setRedirectPath = (path) => {
  return {
    type: AUTH_SET_REDIRECT_PATH,
    payload: path,
  };
};

export const authentication = (email, password) => {
  return async (dispatch) => {
    const response = null;
    try {
      const response = await timeCloudAPI.post("login", {
        email,
        password,
      });
      console.log(response.headers.authorization, response.headers.userid);
      dispatch(
        authSuccess(response.headers.authorization, response.headers.userid)
      );
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(authFail(error.response.data.message));
    }
  };
};

export const logout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};
