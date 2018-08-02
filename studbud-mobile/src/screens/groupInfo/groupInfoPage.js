import React from "react";
import { ScrollView, Image, View, Text, TouchableOpacity } from "react-native";
import { RkText, RkCard, RkStyleSheet } from "react-native-ui-kitten";
import Colors from "../../../constants/Colors";
import { MyMeetupsList } from "../home/components/";

import { LoadingScreen } from "../../commons";

import styles2 from "./styles/groupInfoPage";
import { Card } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import Moment from "moment";
import { sortBy } from "lodash";
var _ = require("lodash/core");

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchMyMeetups } from "../home/meetupactions";
import { getUser } from "../auth/actions";

class groupInfoPage extends React.Component {
  static navigationOptions = {
    //title: {"User Profile"}.toUpperCase()
  };

  constructor(props) {
    super(props);
    let { params } = this.props.navigation.state;
    let id = params ? params.id : 1;
  }

  refresh() {
    this.props.fetchMyMeetups(this.props.navigation.state.params.curgroup._id);
  }

  componentWillMount() {
    let thisgroup = this.props.navigation.state.params.curgroup._id;
    //console.log("TIS GORUPPU ", thisgroup);
    this.props.fetchMyMeetups(thisgroup);
  }

  render() {
    const { curgroup } = this.props.navigation.state.params;
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

    var sorted = _.sortBy(data, "eventDate");
    //console.log(sorted);

    return (
      <View style={styles.root2}>
        <ScrollView style={styles.root}>
          <View style={styles.topContainer}>
            <View>
              <RkCard rkType="article">
                <View
                  rkCardHeader
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.$navigationTint,
                    backgroundColor: "#fff"
                  }}
                >
                  <View>
                    <RkText style={styles.title} rkType="header4">
                      {curgroup.name.toUpperCase()}
                    </RkText>
                    <View style={styles.loc}>
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
                      <RkText rkType="secondary2 hintColor">
                        {curgroup.location}
                      </RkText>
                    </View>
                  </View>
                  <TouchableOpacity />
                </View>
                <View rkCardContent>
                  <View>
                    <RkText rkType="primary3 bigLine">
                      {curgroup.description}
                    </RkText>
                  </View>
                </View>
                <View rkCardFooter />
              </RkCard>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles2.titleContainer}>
              <Text style={styles2.title}>Upcoming Meetups</Text>
              <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("CreateMeetup", {
                      curgroup: curgroup._id,
                      onGoBack: () => this.refresh()
                    })
                  }
                >
                  <MaterialIcons
                    name="add-circle"
                    size={22}
                    style={{
                      //fontSize: 30,
                      //padding:1
                      color: Colors.$navigationTint
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView horizontal>
              {sorted.map((meetup, i) => (
                <View key={i} style={styles2.meetupCard}>
                  <View style={styles2.meetupCardBottomContainer}>
                    <Text style={styles2.meetupCardMetaName}>
                      {meetup.title}
                    </Text>
                    <Text style={styles2.meetupCardMetaDate}>
                      {Moment(meetup.eventDate).format("lll")}
                    </Text>
                  </View>

                  <View style={styles2.meetupCardTopContainer}>
                    <Text style={styles2.meetupCardTitle}>
                      {meetup.description}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  root2: {
    flex: 1
  },
  title: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold"
  },
  loc: {
    justifyContent: "center",
    flexDirection: "row"
  },
  topContainer: {
    flex: 1
  },
  bottomContainer: {
    flex: 0.6,
    marginBottom: 5
  }
}));

groupInfoPage.propTypes = {
  myMeetups: PropTypes.object.isRequired,
  fetchMyMeetups: PropTypes.func.isRequired,
  currentGroup: PropTypes.string,
  getUser: PropTypes.func.isRequired,
  fetcheduser: PropTypes.object
};

const mapStateToProps = state => ({
  myMeetups: state.meetup.myMeetups,
  currentGroup: state.createGroup.currentGroup,
  fetcheduser: state.loguser.fetcheduser
});

export default connect(
  mapStateToProps,
  { fetchMyMeetups, getUser }
)(groupInfoPage);
