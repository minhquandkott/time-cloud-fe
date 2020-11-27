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
  AUTH_SET_USER_ROLE,
  AUTH_SET_MANAGED_PROJECTS,
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
    payload: { error: error },
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
      const response1 = await timeCloudAPI().post("login", {
        email,
        password,
      });
      const { authorization, userid } = response1.headers;
      localStorage.setItem(TOKEN, authorization);
      localStorage.setItem(USER_ID, userid);
      console.log(authorization, userid);
      dispatch(authSuccess(authorization, userid));
      dispatch(setUserInfo(response1.data));
      dispatch(fetchUserRole(userid));
      history.push("/");
    } catch (error) {
      console.log(error);
      dispatch(authFail(error.response.data.message));
    }
  };
};

const setUserRole = (userRole) => {
  return {
    type: AUTH_SET_USER_ROLE,
    payload: userRole,
  };
};

const setManagedProjects = (projects) => {
  return {
    type: AUTH_SET_MANAGED_PROJECTS,
    payload: projects,
  };
};

const fetchUserRole = (userId) => {
  return async (dispatch) => {
    try {
      const response2 = await timeCloudAPI().get(
        `companies/52/users/${userId}/role`
      );
      const roles = response2.data.map((ele) => ele.role);
      dispatch(setUserRole(roles));
      if (!roles.some((ele) => ele.name === "ADMIN")) {
        const res = await timeCloudAPI().get(`users/${userId}/manage_project`);
        dispatch(setManagedProjects(res.data));
      }
    } catch (error) {
      console.log("error");
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
  return (dispatch) => {
    const token = localStorage.getItem(TOKEN);
    const userId = localStorage.getItem(USER_ID);
    if (!token) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token, userId));
      dispatch(fetchUser(userId));
      dispatch(fetchUserRole(userId));
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
    payload: { error: errorMessage },
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
      dispatch(signUpFail(error.response.data.message));
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
    const response = await timeCloudAPI().get(`users/${id}`);
    dispatch(setUserInfo(response.data));
  };
};
