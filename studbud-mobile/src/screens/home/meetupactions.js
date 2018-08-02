import { MeetupApi } from "../../../constants/api";

const meetupApi = new MeetupApi();

// create constant for type name
export const FETCH_MY_MEETUPS = "FETCH_MY_MEETUPS";

// creates an action called fetchMyMeetups
// takes no arguments and returns an object
export const fetchMyMeetups = groupId => ({
  type: FETCH_MY_MEETUPS,
  payload: meetupApi.fetchGroupMeetups(groupId)
});
