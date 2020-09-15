import {
  AUTH_FAIL,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_SET_REDIRECT_PATH,
  AUTH_SIGN_UP_FAIL,
  AUTH_SIGN_UP_SUCCESS,
  AUTH_START_SIGN_UP,
} from "./actionType";
import timeCloudAPI from "../../apis/timeCloudAPI";
import history from "../../history";
import { TOKEN, USER_ID } from "../../utils/localStorageContact";
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
      const response = await timeCloudAPI.post("/login", {
        email,
        password,
      });

      const { authorization, userid } = response.headers;
      dispatch(authSuccess(authorization, userid));
      history.push("/");
      localStorage.setItem(TOKEN, authorization);
      localStorage.setItem(USER_ID, userid);
    } catch (error) {
      dispatch(authFail(error.response.message));
    }
  };
};

export const logout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const checkAuth = () => {
  return (dispatch, getState) => {
    const token = localStorage.getItem(TOKEN);

    if (!token) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token, localStorage.getItem(USER_ID)));
    }
  };
};

export const startSignUp = () => {
  return {
    type: AUTH_START_SIGN_UP,
  };
};

export const signUpSuccess = () => {
  return {
    type: AUTH_SIGN_UP_SUCCESS,
  };
};

export const signUpFail = (errorMessage) => {
  return {
    type: AUTH_SIGN_UP_FAIL,
    payload: errorMessage,
  };
};

export const signUp = (username, email, password) => {
  return async (dispatch) => {
    dispatch(startSignUp());
    try {
      await timeCloudAPI.post(`users`, {
        name: username,
        email,
        password,
      });
      dispatch(signUpSuccess());
      history.push("/login");
    } catch (error) {
      dispatch(signUpFail(error.response.message));
    }
  };
};
