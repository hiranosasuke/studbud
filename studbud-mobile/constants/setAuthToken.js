import axios from "axios";

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
    //console.log(token);
  } else {
    // Delete auth header if token isn't there
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
