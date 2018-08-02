import { Font } from "expo";
import React from "react";
import { Provider } from "react-redux";
import EStyleSheet from "react-native-extended-stylesheet";
import jwt_decode from "jwt-decode";
import setAuthToken from "./constants/setAuthToken";
import { SET_CURRENT_USER } from "./src/screens/auth/actions";
import { AsyncStorage } from "react-native";

import Root from "./src/Root";

import Colors from "./constants/Colors";
//import { HomeScreen } from './src/screens';
import { cachedFonts } from "./helpers";
import store from "./src/redux/store";

EStyleSheet.build(Colors);

// Check for token
AsyncStorage.getItem("jwtToken", (err, result) => {
  if (!err && result != null) {
    //console.log(token);
    setAuthToken(result);
    // decode token and get user info
    const decoded = jwt_decode(result);
    //console.log("DECODED: ", decoded);
    store.dispatch({ type: SET_CURRENT_USER, payload: decoded });
  } else {
    //console.log("nope");
  }
});

export default class App extends React.Component {
  /*state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Expo.Font.loadAsync({
      'montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });

  }*/

  render() {
    //return <Root />;
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}
