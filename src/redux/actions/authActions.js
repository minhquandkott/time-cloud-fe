import {
  AUTH_AUTHENTICATION,
  AUTH_FAIL,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_SET_REDIRECT_PATH,
} from "./actionType";
import timeCloudAPI from "../../apis/timeCloudAPI";
import history from "../../history";
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
    dispatch(authStart());
    try {
      const response = await timeCloudAPI.post("login", {
        email,
        password,
      });

      const { authorization, userid } = response.headers;
      console.log(response);
      dispatch(authSuccess(authorization, userid));
      history.push("/");
      localStorage.setItem("token", authorization);
      localStorage.setItem("userId", userid);
    } catch (error) {
      dispatch(authFail(error.response.data.message));
    }
  };
};

export const logout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const checkAuth = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(logout());
    } else {
      console.log(token);
      dispatch(authSuccess(token, localStorage.getItem("userId")));
    }
  };
};
