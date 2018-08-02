import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  StyleSheet,
  Alert
} from "react-native";
import { Header } from "react-native-elements";

import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
var _ = require("lodash/core");

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../auth/actions";
import { LoadingScreen } from "../../commons";
import { getUserProfile, clearCurrentProfile } from "./actions";

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5FCFF"
  },

  SubmitButtonStyle: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#be1513",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },

  TextStyle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  },
  descr: {
    paddingTop: 2,
    fontSize: 11,
    color: Colors.$darkBlue
  },
  value: {
    fontSize: 15
  }
});

class ProfileScreen extends Component {
  componentDidMount() {
    this.props.getUserProfile();
  }

  static navigationOptions = {
    tabBarButtonComponent: TouchableOpacity,
    tabBarIcon: ({ tintColor }) => (
      <Ionicons name="md-person" size={30} color={tintColor} />
    )
  };

  _logoutClicked() {
    //console.log("Group id", group._id);
    this.props.clearCurrentProfile();
    this.props.logout();
  }

  _logoutAlert() {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Logout", onPress: () => this._logoutClicked() }
    ]);
  }

  render() {
    const { user } = this.props.loguser;
    const { profile, loading } = this.props.profile;

    let profilecontent;

    if (profile === null || loading) {
      return <LoadingScreen />;
    }

    if (profile === undefined || _.isEmpty(profile)) {
      return (
        <View
          style={{
            flex: 1
            //display: "flex"
            //height: 300
          }}
        >
          <Header
            centerComponent={{
              text: "MY PROFILE",
              style: { color: Colors.$whiteColor, fontSize: 15 }
            }}
            rightComponent={{
              icon: "edit",
              type: "feather",
              color: Colors.$whiteColor,
              onPress: () => this.props.navigation.navigate("CreateProfile"),
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
              You haven't created a profile!
              {"\n"}Click the edit button to create one.
            </Text>
          </View>
          <View style={{ paddingBottom: 10 }}>
            <TouchableOpacity
              style={styles.SubmitButtonStyle}
              activeOpacity={0.5}
              onPress={() => this._logoutAlert()}
            >
              <Text style={styles.TextStyle}> LOGOUT </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,

            backgroundColor: "white",
            flexDirection: "column"
            //display: "flex"
            //height: 300
          }}
        >
          <Header
            centerComponent={{
              text: "MY PROFILE",
              style: { color: Colors.$whiteColor, fontSize: 15 }
            }}
            rightComponent={{
              icon: "edit",
              type: "feather",
              color: Colors.$whiteColor,
              onPress: () => this.props.navigation.navigate("CreateProfile"),
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
              alignItems: "center",
              flex: 0.5,
              paddingBottom: 30,
              backgroundColor: Colors.$whiteBlue
            }}
          >
            <Text
              style={{
                marginBottom: 5,
                marginTop: 10,
                fontSize: 20,
                fontWeight: "bold",
                color: Colors.$navigationTint
              }}
            >
              {profile.user.name}
            </Text>
            <Image
              style={{
                height: 110,
                borderRadius: 55,
                width: 110,
                borderColor: Colors.$whiteColor,
                borderWidth: 3
              }}
              source={{ uri: `https:${profile.user.avatar}` }}
            />
            <View>
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: "row"
                }}
              >
                <Image
                  source={require("../../../assets/images/locationpin.png")}
                  style={{
                    //width: undefined,
                    height: 20,
                    width: 20,
                    paddingTop: 2
                  }}
                  resizeMode="center"
                />

                <Text style={{ paddingTop: 2 }}>{profile.location}</Text>
              </View>
            </View>
          </View>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              marginLeft: 30,
              marginRight: 30,
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <View>
              <View
                style={{
                  flex: 1,
                  paddingTop: 10
                }}
              >
                <Text style={styles.descr}>Handle:</Text>
                <Text style={styles.value}>
                  {profile.handle}
                  {"\n"}
                </Text>

                <Text style={styles.descr}>Status:</Text>
                <Text style={styles.value}>
                  {profile.status}
                  {"\n"}
                </Text>

                <Text style={styles.descr}>Skills:</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {profile.skills.map((skill, i) => (
                    <Text key={i} style={{ paddingRight: 3 }}>
                      ✓{skill}
                      {"  "}
                    </Text>
                  ))}
                </View>

                <Text style={styles.descr}>{profile.bio ? "Bio:" : null}</Text>
                <Text style={styles.value}>
                  {profile.bio ? profile.bio : null}
                  {"\n"}
                </Text>

                <Text style={styles.descr}>
                  {profile.company ? "Company:" : null}
                </Text>
                <Text style={styles.value}>
                  {profile.company ? profile.company : null}
                </Text>

                <Text style={styles.descr}>
                  {profile.website ? "Website:" : null}
                </Text>
                <Text style={styles.value}>
                  {profile.website ? profile.website : null}
                </Text>
              </View>
            </View>
            <View style={{ paddingBottom: 10 }}>
              <TouchableOpacity
                style={styles.SubmitButtonStyle}
                activeOpacity={0.5}
                onPress={() => this._logoutAlert()}
              >
                <Text style={styles.TextStyle}> LOGOUT </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

ProfileScreen.propTypes = {
  logout: PropTypes.func.isRequired,
  loguser: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  loguser: state.loguser,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getUserProfile, logout, clearCurrentProfile }
)(ProfileScreen);
