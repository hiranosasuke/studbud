import React, { Component } from "react";
//import { addNavigationHelpers } from "react-navigation";
import { connect } from "react-redux";

import { LoginScreen } from "../screens";
import Navigator from "./Navigator";
import LoginNavigator from "./LoginNavigator";

@connect(state => ({
  navigation: state.navigation,
  loguser: state.loguser
}))
export default class AppNavigator extends Component {
  state = {};
  render() {
    const navigation = {
      dispatch: this.props.dispatch,
      state: this.props.navigation
    };

    if (this.props.loguser.isAuthenticated) {
      return <Navigator />;
    }

    return <LoginNavigator />;
  }
}

export const router = Navigator.router;
