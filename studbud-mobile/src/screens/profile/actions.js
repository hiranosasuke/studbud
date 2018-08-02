import { ProfileApi } from "../../../constants/api";
import Axios from "../../../node_modules/axios";

const profileApi = new ProfileApi();

// create constant for type name
export const GET_PROFILE = "GET_PROFILE";
export const PROFILE_LOADING = "PROFILE_LOADING";
export const PROFILE_NOT_FOUND = "PROFILE_NOT_FOUND";
export const CLEAR_CURRENT_PROFILE = "CLEAR_CURRENT_PROFILE";
export const GET_PROFILES = "FETCH_MY_PROFILES";

export const CREATE_PROFILE = "CREATE_PROFILE";
export const CREATE_PROFILE_SUCCESS = "CREATE_PROFILE_SUCCESS";
export const CREATE_PROFILE_ERROR = "CREATE_PROFILE_ERROR";

export const getUserProfile = () => async dispatch => {
  dispatch({ type: PROFILE_LOADING });

  const profile = await profileApi.getUserProfile().then(res => {
    return res;
  });

  dispatch({
    type: GET_PROFILE,
    payload: profile
  });
};

export const clearCurrentProfile = () => dispatch => {
  dispatch({ type: CLEAR_CURRENT_PROFILE });
};

// Create Profile
export const createProfile = profileData => async dispatch => {
  dispatch({ type: CREATE_PROFILE });
  try {
    await profileApi.createProfile(profileData);
    dispatch({ type: CREATE_PROFILE_SUCCESS });
  } catch (e) {
    return dispatch({ type: CREATE_PROFILE_ERROR });
  }
  return await dispatch(getUserProfile());
};
