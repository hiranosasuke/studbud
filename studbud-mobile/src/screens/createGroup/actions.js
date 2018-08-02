import { GroupApi } from "../../../constants/api";
import { fetchMyGroups } from "../home/actions";

const groupApi = new GroupApi();

export const CREATE_GROUP = "CREATE_GROUP";
export const CREATE_GROUP_SUCCESS = "CREATE_GROUP_SUCCESS";
export const CREATE_GROUP_ERROR = "CREATE_GROUP_ERROR";

export const SET_CURRENT_GROUP = "SET_CURRENT_GROUP";
export const SET_GROUP_ERROR = "SET_GROUP_ERROR";

export const createGroup = (userId, { ...args }) => async dispatch => {
  dispatch({ type: CREATE_GROUP });
  try {
    await groupApi.createGroup(userId, { ...args });
    dispatch({ type: CREATE_GROUP_SUCCESS });
  } catch (e) {
    return dispatch({ type: CREATE_GROUP_ERROR });
  }
  return await dispatch(fetchMyGroups());
};

export const setGroup = groupID => async dispatch => {
  try {
    //console.log("setting group to:", groupID);
    return dispatch({ type: SET_CURRENT_GROUP, payload: groupID });
  } catch (e) {
    return dispatch({ type: SET_GROUP_ERROR });
  }
};
