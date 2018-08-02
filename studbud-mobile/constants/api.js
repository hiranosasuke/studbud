import axios from "axios";
import setAuthToken from "./setAuthToken";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";
import { connect } from "react-redux";

//http://192.168.1.14:5000
//axios.defaults.baseURL = "http://192.168.1.20:3000/api";
//https://rocky-reef-93770.herokuapp.com/api/app
axios.defaults.baseURL = "https://rocky-reef-93770.herokuapp.com/api/app";

//const fakeGroupId = "5b35a4952e6b8e49c013b8a5";
const fakeGroupId = "5b58f3bddb5991556887d023";
const fakeUserId = "5b593cccbfc4ae4c60190ef1";

class MeetupApi {
  constructor() {
    //this.groupId = fakeGroupId;
    // might need /app/groups
    this.path = `/groups/${this.groupId}/meetups`;
  }

  async fetchGroupMeetups(groupId) {
    try {
      const { data } = await axios.get(`/groups/${groupId}/meetups`);

      return data.meetups;
    } catch (e) {
      throw e;
    }
  }

  async createGroupMeetups(groupId, { ...args }) {
    try {
      const res = await axios.post(`/groups/${groupId}/meetups/new`, {
        ...args
      });
      console.log(res);
      return res;
    } catch (e) {
      throw e;
    }
  }
}
export { MeetupApi };

class GroupApi {
  constructor() {
    //this.groupId = fakeGroupId;
    this.path = `/groups`;
    this.testId = fakeUserId;
    //this.sweetid = this.getUser();
    //console.log("Sweetid up hereee ", this.sweetid);
  }

  async fetchAllGroups(userId) {
    if (!userId) {
      try {
        const result = await AsyncStorage.getItem("jwtToken");
        const decoded = jwt_decode(result);
        //console.log("yeeeehaw ", decoded.id);
        const { data } = await axios.get(`${this.path}/${decoded.id}/all`);
        return data.groups;
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const { data } = await axios.get(`${this.path}/${userId}/all`);

        return data.groups;
      } catch (e) {
        console.log(e);
      }
    }
  }

  async createGroup(userId, { ...args }) {
    try {
      const res = await axios
        .post(`/users/${userId}/groups/new`, { ...args })
        .catch(err => res.status(404).json(err));
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async addUserToGroup(userId, groupId) {
    try {
      const res = await axios
        .post(`/groups/addUser/${groupId}/${userId}`)
        .catch(err => res.status(404).json(err));
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async searchGroups(searchTerm) {
    try {
      const { data } = await axios.get(`${this.path}/search/${searchTerm}`);
      console.log("RETURNED FROM SEARCH API: ", data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  /*async deleteGroup(groupId) {
    try{
      const res = await axios.delete(`/groups/${groupId}`)
        }
        
  }*/
}
export { GroupApi };

// export const fetchMeetups = () =>
//   fetch('http://192.168.1.32:3000/api/meetups')
//   .then(res => res.json());

class UserApi {
  constructor() {
    this.path = `/users`;
  }

  async login(args) {
    try {
      const { data } = await axios.post(`${this.path}/login`, args);
      //console.log(data);
      return data;
    } catch (e) {
      throw e;
    }

    /*await axios
      .post(`${this.path}/login`, args)
      .then(res => {
        //console.log(res.data);
        const { token } = res.data;
        console.log(token);
        AsyncStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        return decoded;
      })
      .catch(err => console.log(err));*/
  }

  async signup(args) {
    try {
      const res = await axios.post(`${this.path}/register`, { ...args });
      console.log(res.data);
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async getUser(userId) {
    try {
      const { data } = await axios.get(`/users/${userId}`);
      console.log("DATA IS::: ", data);
      return data;
    } catch (e) {
      throw e;
    }
  }
}

export { UserApi };

class ProfileApi {
  constructor() {
    this.path = `/profiles`;
  }

  async getUserProfile() {
    try {
      const res = await axios.get(`${this.path}`);
      return res.data;
    } catch (e) {
      const emptyprof = {};
      return emptyprof;
    }
  }

  async createProfile(profileData) {
    try {
      const res = await axios.post(`${this.path}`, profileData);
      return res;
    } catch (e) {
      console.log(e);
    }
  }
}
export { ProfileApi };
