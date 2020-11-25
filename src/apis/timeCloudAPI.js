import axios from "axios";
import store from "../redux/store";
import { TOKEN, USER_ID } from "../utils/localStorageContact";

const getAuthState = () => {
  return store.getState().auth;
};
//http://localhost:8080/
//https://apitimecloudtracker.herokuapp.com/
export default () => {
  return axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
      [TOKEN]: getAuthState().token ? getAuthState().token : "token",
      [USER_ID]: getAuthState().userId ? getAuthState().userId : "userId",
    },
  });
};
