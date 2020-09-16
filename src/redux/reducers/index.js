import { combineReducers } from "redux";
import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import { reducer as formReducer } from "redux-form";
import taskReducer from "./taskReducer";
import timeReducer from "./timeReducer";
import timesReducer from "./timesReducer";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  projects: projectReducer,
  tasks: taskReducer,
  time: timeReducer,
  times: timesReducer,
});
