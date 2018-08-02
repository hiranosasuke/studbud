import { UserApi } from "../../../constants/api";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";
import setAuthToken from "../../../constants/setAuthToken";

const userApi = new UserApi();

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const login = args => async dispatch => {
  try {
    const data = await userApi.login(args);
    AsyncStorage.setItem("jwtToken", data.token);
    //AsyncStorage.getItem("jwtToken").then(res => console.log(res));
    setAuthToken(data.token);
    console.log(data.token);
    const decoded = jwt_decode(data.token);
    AsyncStorage.setItem("thisuserid", decoded.id);
    //console.log(decoded);
    return dispatch({ type: SET_CURRENT_USER, payload: decoded });
  } catch (e) {
    return dispatch({ type: LOGIN_ERROR });
  }
};

export const setCurrentUser = async decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const logout = () => dispatch => {
  // Remove token
  try {
    AsyncStorage.removeItem("jwtToken", err => {
      setAuthToken(false);
      return dispatch({ type: SET_CURRENT_USER, payload: {} });
    });
  } catch (e) {
    return dispatch({ type: LOGOUT_ERROR });
  }
};

export const SIGNUP = "SIGNUP";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";

export const signup = args => async dispatch => {
  dispatch({ type: SIGNUP });
  try {
    await userApi.signup(args);
    dispatch({ type: SIGNUP_SUCCESS, payload: args });
  } catch (e) {
    return dispatch({ type: SIGNUP_ERROR });
  }
  //return await dispatch(fetchMyGroups());
};

export const GET_USER = "GET_USER";

// creates an action called fetchMyGroups
// takes userid and returns an object
export const getUser = userId => ({
  type: GET_USER,
  payload: userApi.getUser(userId)
});
