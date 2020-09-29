import {
  LOADING,
  FETCH_MEMBERS_SUCCESS,
  MEMBERS_ACTION_FAIL,
  SELECT_MEMBER,
  ADD_ROLE_SUCCESS,
  ADD_ROLE_FAIL,
} from "../actions/actionType";

const initialState = {
  members: [],
  isFetching: false,
  errorMessage: null,
  selectedMember: null,
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
        const {
          createAt,
          createdBy,
          modifyAt,
          modifiedBy,
          user,
          role,
          company,
        } = curV;
        let temp = preV.find((e) => e.user.id === curV.user.id);
        if (!temp) {
          temp = {
            id: user.id,
            user,
            company,
            roles: [role],
            createAt,
            createdBy,
            modifiedBy,
            modifyAt,
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
      return {
        ...state,
        selectedMember: payload,
      };
    case ADD_ROLE_SUCCESS:
      return {
        ...state,
        selectedMember: payload,
      };
    case ADD_ROLE_FAIL:
      return {
        ...state,
        selectedMember: payload,
      };

    default:
      return state;
  }
};
