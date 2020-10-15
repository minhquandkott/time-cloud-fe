import {
  LOADING,
  FETCH_MEMBERS_SUCCESS,
  MEMBERS_ACTION_FAIL,
  SELECT_MEMBER,
  GET_USER_SUCCESS,
  ADD_ROLE_USER_SUCCESS,
  DELETE_ROLE_USER_SUCCESS,
  START_CHANGE_USER_ROLE,
} from "../actions/actionType";

const initialState = {
  members: [],
  isFetching: false,
  errorMessage: null,
  selectedMember: null,
  changeRoleLoading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_MEMBERS_SUCCESS:
      const userRoles = payload.reduce((preV, curV) => {
        const { user, role, company } = curV;
        let temp = preV.find((e) => e.user.id === curV.user.id);
        if (!temp) {
          temp = {
            id: user.id,
            user,
            company,
            roles: [role],
          };
          preV.push(temp);
        } else {
          temp.roles = [...temp.roles, role];
        }
        return preV;
      }, []);
      return {
        ...state,
        isFetching: false,
        members: [...userRoles],
      };
    case MEMBERS_ACTION_FAIL:
      return {
        ...state,
        isFetching: false,
        errorMessage: payload,
      };
    case SELECT_MEMBER:
      console.log(payload);
      return {
        ...state,
        selectedMember: { ...payload },
      };
    case START_CHANGE_USER_ROLE:
      return {
        ...state,
        changeRoleLoading: true,
      };
    case ADD_ROLE_USER_SUCCESS:
      const addedMember = state.members.find(
        (ele) => ele.id === payload.userId
      );
      addedMember.roles.push(payload.role);
      return {
        ...state,
        changeRoleLoading: false,
      };
    case DELETE_ROLE_USER_SUCCESS:
      const deletedMember = state.members.find(
        (ele) => ele.id === payload.userId
      );
      deletedMember.roles = deletedMember.roles.filter(
        (role) => role.id !== payload.roleId
      );
      return {
        ...state,
        changeRoleLoading: false,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        selectedMember: payload,
      };
    default:
      return state;
  }
};
