import {
  LOADING,
  FETCH_MEMBERS_SUCCESS,
  MEMBERS_ACTION_FAIL,
  SELECT_MEMBER,
  ADD_ROLE_SUCCESS,
} from "./actionType";
import timeCloudAPI from "../../apis/timeCloudAPI";

const startLoading = () => {
  return {
    type: LOADING,
  };
};

const fetchMembersSuccess = (members) => {
  return {
    type: FETCH_MEMBERS_SUCCESS,
    payload: members,
  };
};

const membersActionFail = (errorMessage) => {
  return {
    type: MEMBERS_ACTION_FAIL,
    payload: errorMessage,
  };
};

export const selectMember = (member) => {
  return {
    type: SELECT_MEMBER,
    payload: member,
  };
};

export const fetchMembers = (companyId) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const response = await timeCloudAPI().get(`companies/${companyId}/users`);
      dispatch(fetchMembersSuccess(response.data));
    } catch (error) {
      dispatch(membersActionFail(error.response.errorMessage));
    }
  };
};

export const addRoleForUser = (userId, companyId, roleId) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const response = await timeCloudAPI().post(
        `companies/${companyId}/role/${roleId}/users/${userId}`
      );
      dispatch(addRoleMemberSuccess(response.data));
    } catch (error) {
      dispatch(membersActionFail(error.response.errorMessage));
    }
  };
};

export const addRoleMemberSuccess = (roleMember) => {
  return {
    type: ADD_ROLE_SUCCESS,
    payload: roleMember,
  };
};
