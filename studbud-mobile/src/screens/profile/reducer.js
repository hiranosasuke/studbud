import {
  PROFILE_LOADING,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE,
  CREATE_PROFILE,
  CREATE_PROFILE_ERROR,
  CREATE_PROFILE_SUCCESS
} from "./actions";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };

    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };

    case CREATE_PROFILE:
      return {
        ...state,
        loading: true
      };
    case CREATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case CREATE_PROFILE_ERROR:
      return {
        loading: false
      };

    default:
      return state;
  }
};
