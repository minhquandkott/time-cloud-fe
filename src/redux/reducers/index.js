import { combineReducers } from "redux";
import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import { reducer as formReducer } from "redux-form";
import timeReducer from "./timeReducer";
import timesReducer from "./timesReducer";
import membersReducer from "./membersReducer";
import weekReducer from "./weekReducer";
import { AUTH_LOGOUT } from "../actions/actionType";
const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  projects: projectReducer,
  time: timeReducer,
  times: timesReducer,
  members: membersReducer,
  week: weekReducer,
});

export default (state, action) =>
  rootReducer(action.type === AUTH_LOGOUT ? undefined : state, action);
