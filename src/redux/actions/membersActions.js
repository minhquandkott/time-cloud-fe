import {
  LOADING,
  FETCH_MEMBERS_SUCCESS,
  MEMBERS_ACTION_FAIL,
  SELECT_MEMBER,
  GET_USER_SUCCESS,
  ADD_ROLE_USER_SUCCESS,
  DELETE_ROLE_USER_SUCCESS,
  START_CHANGE_USER_ROLE,
} from "./actionType";
import { ROLE_LIST } from "../../utils/Utils";
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

const actionFail = (errorMessage) => {
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
      dispatch(actionFail(error.response.data.errorMessage));
    }
  };
};

export const addUserRole = (roleId) => {
  return (dispatch, getState) => {
    const { user, company } = getState().members.selectedMember;
    dispatch({ type: START_CHANGE_USER_ROLE });

    timeCloudAPI().post(
      `companies/${company.id}/role/${roleId}/users/${user.id}`
    );
    dispatch(
      addUserRoleSuccess(
        user.id,
        ROLE_LIST.find((role) => role.id === roleId)
      )
    );
    dispatch(
      selectMember(getState().members.members.find((ele) => ele.id === user.id))
    );
  };
};

export const deleteUserRole = (roleId) => {
  return (dispatch, getState) => {
    const { id, company } = getState().members.selectedMember;
    dispatch({ type: START_CHANGE_USER_ROLE });
    timeCloudAPI().delete(`companies/${company.id}/role/${roleId}/users/${id}`);
    dispatch(deleteUserRoleSuccess(id, roleId));
    dispatch(
      selectMember(getState().members.members.find((ele) => ele.id === id))
    );
  };
};

const addUserRoleSuccess = (userId, role) => {
  return {
    type: ADD_ROLE_USER_SUCCESS,
    payload: {
      userId,
      role,
    },
  };
};
const deleteUserRoleSuccess = (userId, roleId) => {
  return {
    type: DELETE_ROLE_USER_SUCCESS,
    payload: {
      userId,
      roleId,
    },
  };
};

export const getUser = (userId) => {
  return async (dispatch) => {
    try {
      const response = await timeCloudAPI().get(`users/${userId}`);
      dispatch(getUserSuccess(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserSuccess = (user) => {
  return {
    type: GET_USER_SUCCESS,
    payload: user,
  };
};
