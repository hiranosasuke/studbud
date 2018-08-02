import React, { Component } from "react";
import { Font } from "expo";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import { Button, Icon } from "native-base";

import { LoadingScreen } from "../../commons";
import { MyMeetupsList } from "./components";
import { MyGroupsList } from "./components";

// import { MeetupApi } from '../../../constants/api';
import { fetchMyMeetups } from "./actions";
import styles from "./styles/HomeScreen";
import Colors from "../../../constants/Colors";

// const meetupApi = new MeetupApi();

@connect(
  state => ({
    myMeetups: state.home.myMeetups
  }),
  { fetchMyMeetups }
)
class HomeScreen extends Component {
  static navigationOptions = {
    tabBarButtonComponent: TouchableOpacity,
    title: "Home",
    tabBarIcon: ({ tintColor }) => (
      <FontAwesome
        name="home"
        size={30}
        color={
          tintColor
        } /*style={{borderBottomWidth: 2,
         borderBottomColor: tintColor }}*/
      />
    )
  };

  // fetch our meetups
  componentDidMount() {
    this.props.fetchMyMeetups(groupId);
  }

  render() {
    console.log(this.props);
    const {
      myMeetups: { isFetched, data, error }
    } = this.props;
    if (!isFetched) {
      return <LoadingScreen />;
    } else if (error.on) {
      return (
        <View>
          <Text>{error.message}</Text>
        </View>
      );
    }
    return (
      <View style={styles.root}>
        <View style={styles.topContainer}>
          <MyGroupsList meetups={data} navigation={this.props.navigation} />
        </View>
        <View style={styles.bottomContainer}>
          <MyMeetupsList meetups={data} navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

export default HomeScreen;
