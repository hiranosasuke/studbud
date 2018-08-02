import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Colors from "../../constants/Colors";
import { Button, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialIcons, Foundation } from "@expo/vector-icons";
// MaterialIcons old icon: add-circle
import { LoginScreen, SignupScreen } from "../screens";

export default createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: ({ navigation }) => ({
        backgroundColor: "white",
        heaverVisible: false,
        headerStyle: {
          height: 0
        }
      })
    },

    Signup: {
      screen: SignupScreen,
      navigationOptions: () => ({
        title: "Create an account",
        headerStyle: {
          backgroundColor: Colors.$mediumBlue,
          height: 50
        },
        headerTitleStyle: {
          fontSize: 15,
          //fontColor: Colors.$whiteColor,
          color: Colors.$darkBlue,
          fontWeight: "400"
        }
      })
    }
  },
  {
    mode: "modal"
  },
  {
    headerMode: "screen"
  }
);
