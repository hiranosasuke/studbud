import { SIGNUP, SIGNUP_SUCCESS, SIGNUP_ERROR } from "./actions";

const INITIAL_STATE = {
  isAuthenticated: false,
  error: {
    on: false,
    message: null
  },
  isLoading: false,
  user: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...INITIAL_STATE,
        isLoading: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...INITIAL_STATE,
        isLoading: false,
        user: action.payload
      };
    case SIGNUP_ERROR:
      return {
        error: {
          on: true,
          message: "Error creating account!"
        },
        isLoading: false
      };

    default:
      return state;
  }
};
