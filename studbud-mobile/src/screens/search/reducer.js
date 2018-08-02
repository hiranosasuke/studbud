import { SEARCH_GROUPS } from "./actions";

const INITIAL_STATE = {
  searchedGroups: {
    data: [],
    isFetched: false,
    error: {
      on: false,
      message: null
    }
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${SEARCH_GROUPS}_PENDING`:
      return INITIAL_STATE;
    case `${SEARCH_GROUPS}_FULFILLED`:
      return {
        searchedGroups: {
          data: action.payload,
          isFetched: true,
          error: {
            on: false,
            message: null
          }
        }
      };
    case `${SEARCH_GROUPS}_REJECTED`:
      return {
        searchedGroups: {
          data: [],
          isFetched: true,
          error: {
            on: true,
            message: "Error when searching groups"
          }
        }
      };

    case `CLEAR_SEARCH`:
      return {
        searchedGroups: {
          data: [],
          isFetched: false
        }
      };
    default:
      return state;
  }
};
