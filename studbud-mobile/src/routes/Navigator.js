import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Colors from "../../constants/Colors";
import HomeNavigator from "./HomeNavigator";
import { Button, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialIcons, Foundation } from "@expo/vector-icons";
// MaterialIcons old icon: add-circle
import {
  CreateMeetupScreen,
  CreateGroupScreen,
  groupInfoPage,
  CreateProfileScreen
} from "../screens";

export default createStackNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: ({ navigation }) => ({
        heaverVisible: false,
        headerStyle: {
          height: 0
        }
      })
    },
    CreateMeetup: {
      screen: CreateMeetupScreen,
      navigationOptions: () => ({
        title: "Create a new Meetup",
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
    },
    CreateGroup: {
      screen: CreateGroupScreen,
      navigationOptions: () => ({
        title: "Create a New Group",
        headerStyle: {
          backgroundColor: Colors.$mediumBlue,
          height: 50
        },
        headerTitleStyle: {
          fontSize: 15,
          //fontColor: Colors.$whiteColor,
          fontWeight: "400"
        }
      })
    },
    GroupInfo: {
      screen: groupInfoPage,
      navigationOptions: () => ({
        headerStyle: {
          backgroundColor: Colors.$mediumBlue,
          height: 50
        },
        headerTitleStyle: {
          fontSize: 15,
          //fontColor: Colors.$whiteColor,
          fontWeight: "400"
        }
      })
    },
    CreateProfile: {
      screen: CreateProfileScreen,
      navigationOptions: () => ({
        headerStyle: {
          backgroundColor: Colors.$mediumBlue,
          height: 50
        },
        headerTitleStyle: {
          fontSize: 15,
          //fontColor: Colors.$whiteColor,
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
