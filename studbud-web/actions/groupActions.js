import axios from "axios";

import {
  ADD_GROUP,
  GET_GROUPS,
  GET_ERRORS,
  GROUP_LOADING,
  DELETE_GROUP,
  GET_GROUP,
  GET_DATA,
  GET_JOINED_GROUPS,
  GET_FIRST_GROUP
} from "./types";

//GET GROUP BY ID
export const getGroupById = id => dispatch => {
  axios
    .get(`/api/groups/id/${id}`)
    .then(res =>
      dispatch({
        type: GET_GROUP,
        payload: res.data
      })
    )
    .catch(res =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

//ADD User To Group
export const addUser = data => dispatch => {
  axios
    .post(`/api/groups/addUser`, data)
    .then(res =>
      dispatch({
        type: GET_GROUP,
        payload: res.data
      })
    )
    .catch(res =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};
// DELETE user
export const removeUser = data => dispatch => {
  axios
    .post(`/api/groups/removeUser`, data)
    .then(res =>
      dispatch({
        type: GET_GROUP,
        payload: res.data
      })
    )
    .catch(res =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};
// DELETE meetup
export const removeMeetup = data => dispatch => {
  axios
    .post(`/api/groups/removeMeetup`, data)
    .then(res =>
      dispatch({
        type: GET_GROUP,
        payload: res.data
      })
    )
    .catch(res =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};
// ADD meetup
export const addMeetup = data => dispatch => {
  axios
    .post("/api/groups/addMeetup", data)
    .then(res =>
      dispatch({
        type: GROUP_LOADING,
        payload: null
      })
    )
    .catch(res =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};
export const addMeetupID = data => dispatch => {
  axios
    .post("/api/groups/addMeetupID", data)
    .then(res =>
      dispatch({
        type: GROUP_LOADING,
        payload: null
      })
    )
    .catch(res =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

//ADD GROUP
export const addGroup = groupData => dispatch => {
  axios
    .post("/api/groups", groupData)
    .then(res =>
      dispatch({
        type: ADD_GROUP,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get All Groups
export const getGroups = data => dispatch => {
  axios
    .get("/api/groups/all")
    .then(res =>
      dispatch({
        type: GET_GROUPS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//DELETE GROUP -- group body must contain id
export const deleteGroup = id => dispatch => {
  axios.delete(`/api/groups/${id}`).then(res =>
    dispatch({
      type: DELETE_GROUP,
      payload: id
    })
  );
};

//GET GROUP BY USER
export const getGroupsByUser = id => dispatch => {
  dispatch(setGroupLoading());
  axios
    .get(`/api/groups/user/${id}`)
    .then(res =>
      dispatch({
        type: GET_GROUPS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_GROUPS,
        payload: null
      })
    );
};

//Search Groups
export const searchGroups = search => dispatch => {
  dispatch(setGroupLoading());
  axios
    .get(`api/groups/search/${search}`)
    .then(res =>
      dispatch({
        type: GET_GROUPS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { err: "No Results" }
      })
    );
};

//Get Groups for sim score
export const similarityScore = id => dispatch => {
  axios
    .post("api/groups/similarityScore", id)
    .then(res =>
      dispatch({
        type: GET_DATA,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: { err: "couldnt find user" }
      });
    });
};

export const getJoinedGroups = id => dispatch => {
  axios.post("api/groups/getJoinedGroups", id).then(res =>
    dispatch({
      type: GET_JOINED_GROUPS,
      payload: res.data
    })
  );
};

export const getFirstGroup = id => dispatch => {
  axios.post("api/groups/getFirstGroup", id).then(res =>
    dispatch({
      type: GET_FIRST_GROUP,
      payload: res.data
    })
  );
};

//SET LOADING
// Set loading state
export const setGroupLoading = () => {
  return {
    type: GROUP_LOADING
  };
};
