import axios from "axios";
import store from "../redux/store";
import { TOKEN, USER_ID } from "../utils/localStorageContact";

const getAuthState = () => {
  console.log(store.getState());
  return store.getState().auth;
};
export default () => {
  return axios.create({
    baseURL: "https://apitimecloudtracker.herokuapp.com/",
    headers: {
      [TOKEN]: getAuthState().token ? getAuthState().token : "token",
      [USER_ID]: getAuthState().userId ? getAuthState().userId : "userId",
    },
  });
};
