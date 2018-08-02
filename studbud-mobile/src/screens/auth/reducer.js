import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SET_CURRENT_USER,
  GET_USER
} from "./actions";
import { isEmpty } from "../../../constants/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
  fetcheduser: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: action.payload.name != null,
        user: action.payload
      };
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        fetcheduser: action.payload
      };
    case `${GET_USER}_REJECTED`:
      return {
        ...state
      };
    default:
      return state;
  }
}
