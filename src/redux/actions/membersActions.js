import {
  FETCH_MEMBERS_START,
  FETCH_MEMBERS_SUCCESS,
  FETCH_MEMBERS_FAIL,
  SELECT_MEMBER,
  ADD_ROLE_MEMBER,
} from "./actionType";
import timeCloudAPI from "../../apis/timeCloudAPI";

const startFetchMembers = () => {
  return {
    type: FETCH_MEMBERS_START,
  };
};

const fetchMembersSuccess = (members) => {
  return {
    type: FETCH_MEMBERS_SUCCESS,
    payload: members,
  };
};

const fetchMembersFail = (errorMessage) => {
  return {
    type: FETCH_MEMBERS_FAIL,
    payload: errorMessage,
  };
};

export const selectMember = (member) => {
  return {
    type: SELECT_MEMBER,
    payload: member,
  };
};

export const fetchMembers = (projectId) => {
  return async (dispatch) => {
    dispatch(startFetchMembers());
    try {
      const response = await timeCloudAPI().get(`companies/${projectId}/users`);
      dispatch(fetchMembersSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(fetchMembersFail(error.response.errorMessage));
    }
  };
};
