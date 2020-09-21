import {
  AUTH_FAIL,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_SET_REDIRECT_PATH,
  AUTH_SIGN_UP_FAIL,
  AUTH_SIGN_UP_SUCCESS,
  AUTH_START_SIGN_UP,
  AUTH_SET_USER_INFO,
} from "./actionType";
import timeCloudAPI from "../../apis/timeCloudAPI";
import history from "../../history";
import { TOKEN, USER_ID } from "../../utils/localStorageContact";
export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = (token, userId, username) => {
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
      const response = await timeCloudAPI().post("/login", {
        email,
        password,
      });

      const { authorization, userid } = response.headers;
      dispatch(authSuccess(authorization, userid));
      dispatch(setUserInfo(response.data));
      history.push("/");
      localStorage.setItem(TOKEN, authorization);
      localStorage.setItem(USER_ID, userid);
    } catch (error) {
      dispatch(authFail(error.response.message));
    }
  };
};

const logoutSuccess = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    localStorage.clear();
    dispatch(logoutSuccess());
    history.push("/");
  };
};

export const checkAuth = () => {
  return (dispatch, getState) => {
    const token = localStorage.getItem(TOKEN);
    const userId = localStorage.getItem(USER_ID);
    if (!token) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token, userId));
      fetchUser(userId);
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
      await timeCloudAPI().post(`users`, {
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

const setUserInfo = (user) => {
  return {
    type: AUTH_SET_USER_INFO,
    payload: user,
  };
};

export const fetchUser = (id) => {
  return async (dispatch) => {
    const response = await timeCloudAPI().get(`users/${id}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InZhbmhpZXAwMCIsImlhdCI6MTU5OTcyMTI3NSwiZXhwIjoxNjAwNTg1Mjc1fQ.3F9ZfEa3jJ5IV-hex3YXPzjzDOy2UOCHOsfqvxBq05w",
      },
    });
    dispatch(setUserInfo(response.data));
  };
};
