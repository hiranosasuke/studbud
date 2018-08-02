import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
import {
  FontAwesome,
  Feather,
  MaterialIcons,
  Entypo
} from "@expo/vector-icons";
import { Header, Card, SearchBar } from "react-native-elements";
import Colors from "../../../constants/Colors";
import styles from "./styles/ProfileScreen";
var _ = require("lodash/core");

import { searchGroups, clearSearch } from "./actions";
import { fetchMyGroups } from "../home/actions";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GroupApi } from "../../../constants/api";

const groupApi = new GroupApi();

/*const styles = {
  input: {
    backgroundColor: "rgba(105, 105, 105, 0.25)",
    width: 300,
    height: 40,
    marginHorizontal: 5,
    paddingLeft: 10,
    //padding: 45,
    borderRadius: 20,
    color: "#ffffff"
  },
  inputWrapper: {
    flex: 0.1,
    paddingBottom: 40,
    paddingTop: 10,
    paddingLeft: 10
  },
  inlineImg: {
    position: "absolute",
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9
  }
};*/

const styles2 = {
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  joinedbutton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#458B00",
    height: 35,
    //width: 100,
    borderRadius: 10
    //zIndex: 100
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.$darkBlue,
    height: 35,
    //width: 100,
    borderRadius: 10
    //zIndex: 100
  },
  text: {
    color: "white",
    backgroundColor: "transparent",
    paddingLeft: 40,
    paddingRight: 40,
    zIndex: 100
  }
};

class SearchScreen extends Component {
  static navigationOptions = {
    tabBarButtonComponent: TouchableOpacity,
    tabBarIcon: ({ tintColor }) => (
      <Feather name="search" size={30} color={tintColor} />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      onClicked: false,
      textValue: "Join Group"
    };
  }

  async _search() {
    await this.props.searchGroups(this.state.search);
  }

  async _addUser(group) {
    await groupApi.addUserToGroup(this.props.loguser.user.id, group._id);
    this.setState({ onClicked: true, textValue: "✓Joined" });
    this.props.fetchMyGroups(this.props.loguser.user.id);
    this.props.navigation.navigate("Home");
  }

  render() {
    var _style;
    if (this.state.onClicked) {
      // clicked button style
      _style = {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#458B00",
        height: 35,
        //width: 100,
        borderRadius: 10
        //zIndex: 100
      };
    } else {
      // default button style
      _style = {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.$darkBlue,
        height: 35,
        //width: 100,
        borderRadius: 10
        //zIndex: 100
      };
    }

    console.log(this.props.loguser.user.id);
    return (
      <View style={{ flex: 1, paddingBottom: 30 }}>
        <Header
          centerComponent={{
            text: "GROUP SEARCH",
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
        <View style={{ flexDirection: "row", paddingTop: 5 }}>
          <TextInput
            style={styles.input}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            placeholder="Search..."
            onChangeText={text => {
              this.setState({ search: text });
            }}
          />
          <TouchableOpacity onPress={() => this._search()}>
            <MaterialIcons
              name="search"
              size={40}
              color="rgba(105, 105, 105, 0.6)"
            />
          </TouchableOpacity>
        </View>
        <ScrollView vertical>
          {this.props.search.searchedGroups.data ? (
            this.props.search.searchedGroups.data.map((group, i) => (
              <View key={i}>
                {_.indexOf(group.users, this.props.loguser.user.id) >
                -1 ? null : (
                  <TouchableWithoutFeedback
                    key={i}
                    //onPress={() => this._groupClicked(group)}
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
                          <View
                            style={{
                              alignContent: "center",
                              justifyContent: "center",
                              flexDirection: "row",
                              alignSelf: "center"
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => this._addUser(group)}
                              style={styles2.button}
                            >
                              <Text style={styles2.text}>Join Group</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </Card>
                    </View>
                  </TouchableWithoutFeedback>
                )}
              </View>
            ))
          ) : (
            <Text
              style={{
                fontSize: 16,
                paddingTop: 10,
                paddingLeft: 10
              }}
            >
              There are no groups matching your search!
            </Text>
          )}
        </ScrollView>
      </View>
    );
  }
}

SearchScreen.propTypes = {
  myGroups: PropTypes.object.isRequired,
  fetchMyGroups: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
  searchGroups: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  loguser: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  myGroups: state.home.myGroups,
  search: state.search,
  loguser: state.loguser
});

export default connect(
  mapStateToProps,
  { searchGroups, clearSearch, fetchMyGroups }
)(SearchScreen);
