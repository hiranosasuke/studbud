import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import {
  HomeReducer,
  MeetupReducer,
  CreateMeetupReducer,
  CreateGroupReducer,
  SignupReducer,
  ProfileReducer,
  SearchReducer
} from "../screens";

import { UserReducer } from "../screens";

import navigation from "../routes/navigationReducer";

export default combineReducers({
  home: HomeReducer,
  meetup: MeetupReducer,
  createMeetup: CreateMeetupReducer,
  createGroup: CreateGroupReducer,
  navigation,
  loguser: UserReducer,
  auth: SignupReducer,
  profile: ProfileReducer,
  search: SearchReducer,
  form
});
