import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback
} from "react-native";
import { Card, ListItem } from "react-native-elements";
import {
  Ionicons,
  Entypo,
  FontAwesome,
  MaterialIcons
} from "@expo/vector-icons";
import { connect } from "react-redux";
import { Button, Icon } from "native-base";
import { Header } from "react-native-elements";
import PropTypes from "prop-types";
import { logout } from "../auth/actions";
import { setGroup } from "../createGroup/actions";

import { LoadingScreen } from "../../commons";
import { MyMeetupsList } from "./components";
import { MyGroupsList } from "./components";

import { fetchMyGroups } from "./actions";
import styles from "./styles/HomeScreen";
import Colors from "../../../constants/Colors";

class HomeScreen extends Component {
  static navigationOptions = {
    tabBarButtonComponent: TouchableOpacity,
    title: "Home",
    tabBarIcon: ({ tintColor }) => (
      <FontAwesome name="home" size={30} color={tintColor} />
    )
  };

  // fetch our groups
  componentWillMount() {
    // Fetch all groups this user has joined
    this.props.fetchMyGroups(this.props.loguser.user.id);
  }

  _groupClicked(group) {
    //console.log("Group id", group._id);
    const groupID = group._id;
    this.props.setGroup(groupID);
    //console.log(this.props.currentGroup);
    this.props.navigation.navigate("GroupInfo", { curgroup: group });
  }

  render() {
    //console.log(this.props);
    const {
      myGroups: { isFetched, data, error }
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

    if (data === undefined || data.length == 0) {
      return (
        <View
          style={{
            flex: 1,
            display: "flex"
            //height: 300
          }}
        >
          <Header
            centerComponent={{
              text: "MY GROUPS",
              style: { color: Colors.$whiteColor, fontSize: 15 }
            }}
            rightComponent={{
              icon: "add-to-list",
              type: "entypo",
              color: Colors.$whiteColor,
              onPress: () => this.props.navigation.navigate("CreateGroup"),
              style: {
                paddingTop: 10,
                fontSize: 23,
                bottom: 0
              }
            }}
            outerContainerStyles={{
              height: Platform.OS === "ios" ? 70 : 70 - 22,
              //backgroundColor: Colors.$mediumBlue,
              backgroundColor: Colors.$darkBlue,
              paddingTop: 3
            }}
          />
          <View
            style={{
              justifyContent: "center",
              flex: 1,
              alignItems: "center",
              alignContent: "center"
            }}
          >
            <Text
              style={{
                justifyContent: "center",
                //flex: 1,
                alignItems: "center",
                alignContent: "center",
                textAlign: "center",
                fontSize: 17,
                color: Colors.$navigationTint
              }}
            >
              You aren't in any groups!
              {"\n"}Create or join a group to get started.
            </Text>
          </View>
        </View>
      );
    } else {
      //console.log("current group", this.props.currentGroup);
      return (
        <View style={styles.root}>
          <Header
            centerComponent={{
              text: "MY GROUPS",
              style: { color: Colors.$whiteColor, fontSize: 15 }
            }}
            rightComponent={{
              icon: "add-to-list",
              type: "entypo",
              color: Colors.$whiteColor,
              onPress: () => this.props.navigation.navigate("CreateGroup"),
              style: {
                paddingTop: 10,
                fontSize: 23,
                bottom: 0
              }
            }}
            outerContainerStyles={{
              height: Platform.OS === "ios" ? 70 : 70 - 22,
              //backgroundColor: Colors.$mediumBlue,
              backgroundColor: Colors.$darkBlue,
              paddingTop: 3
            }}
          />

          <View style={styles.topContainer}>
            <View style={styles.root}>
              <View style={styles.contentContainer}>
                <ScrollView vertical>
                  {data
                    .map((group, i) => (
                      <TouchableWithoutFeedback
                        key={i}
                        onPress={() => this._groupClicked(group)}
                      >
                        <View key={i}>
                          <Card title={group.name} style={styles.groupCard}>
                            <View>
                              <Text style={{ fontSize: 14 }}>
                                {group.description}
                                {"\n\n"}
                              </Text>

                              <View style={styles.loc}>
                                <View style={{ flexDirection: "row" }}>
                                  <Image
                                    source={require("../../../assets/images/users.png")}
                                    style={{
                                      //width: undefined,
                                      height: 16,
                                      width: 16,
                                      paddingTop: 2
                                    }}
                                    resizeMode="center"
                                  />
                                  <Text style={{ fontSize: 12 }}>
                                    {group.users.length}
                                  </Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                  <Image
                                    source={require("../../../assets/images/locationpin.png")}
                                    style={{
                                      //width: undefined,
                                      height: 14,
                                      width: 14,
                                      paddingTop: 2
                                    }}
                                    resizeMode="center"
                                  />
                                  <Text style={{ fontSize: 12 }}>
                                    {group.location}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </Card>
                        </View>
                      </TouchableWithoutFeedback>
                    ))
                    .reverse()}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }
}

//

HomeScreen.propTypes = {
  myGroups: PropTypes.object.isRequired,
  fetchMyGroups: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  loguser: PropTypes.object.isRequired,
  currentGroup: PropTypes.string,
  setGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  myGroups: state.home.myGroups,
  loguser: state.loguser,
  currentGroup: state.createGroup.currentGroup
});

export default connect(
  mapStateToProps,
  { logout, fetchMyGroups, setGroup }
)(HomeScreen);
