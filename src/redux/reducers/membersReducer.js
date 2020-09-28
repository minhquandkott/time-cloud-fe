import {
  FETCH_MEMBERS_START,
  FETCH_MEMBERS_SUCCESS,
  FETCH_MEMBERS_FAIL,
  SELECT_MEMBER,
} from "../actions/actionType";

const initialState = {
  members: [],
  isFetching: false,
  errorMessage: null,
  selectedMember: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_MEMBERS_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_MEMBERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        members: payload,
      };
    case FETCH_MEMBERS_FAIL:
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

    default:
      return state;
  }
};
