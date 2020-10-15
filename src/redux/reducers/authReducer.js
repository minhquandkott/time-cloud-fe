import {
  AUTH_FAIL,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_SET_REDIRECT_PATH,
  AUTH_START_SIGN_UP,
  AUTH_SIGN_UP_FAIL,
  AUTH_SIGN_UP_SUCCESS,
  AUTH_SET_USER_INFO,
  AUTH_SET_USER_ROLE,
} from "../actions/actionType";

const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
  authRedirectPath: "/",
  user: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_START:
      return {
        ...state,
        loading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: payload.token,
        userId: payload.userId,
        loading: false,
      };

    case AUTH_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case AUTH_SET_USER_ROLE:
      return {
        ...state,
        user: { ...state.user, roles: payload },
      };

    case AUTH_SET_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: payload,
      };

    case AUTH_LOGOUT:
      return {
        ...initialState,
      };
    case AUTH_START_SIGN_UP:
      return {
        ...state,
        loading: true,
      };
    case AUTH_SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case AUTH_SIGN_UP_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case AUTH_SET_USER_INFO:
      return {
        ...state,
        user: { ...state.user, ...payload },
        loading: false,
      };
    default:
      return state;
  }
};
