import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import createStackNavigator from "../../../routes/Navigator";
import styles from "./styles/MyGroupsList";
import { Card, ListItem } from "react-native-elements";
import PropTypes from "prop-types";
import { setGroup } from "../../createGroup/actions";
import { connect } from "react-redux";

//mapping tags:
/*{group.tags.map((tag, i) => {
                        tag[i];
                      })}*/

const MyGroupsList = ({ groups, navigation, groupClicked }) => (
  <View style={styles.root}>
    <View style={styles.contentContainer}>
      <ScrollView vertical>
        {groups
          .map((group, i) => (
            <TouchableWithoutFeedback
              key={i}
              onPress={() => groupClicked(group)}
            >
              {/*<View key={i}  style={styles.meetupCard}>*/}
              <View key={i}>
                <Card title={group.name} style={styles.groupCard}>
                  <View>
                    <Text>
                      {group.location}
                      {"\n"}YESSSSSSSSSSSS
                      {group.description}
                    </Text>
                  </View>
                </Card>
              </View>
            </TouchableWithoutFeedback>
          ))
          .reverse()}
      </ScrollView>
    </View>
  </View>
);

MyGroupsList.propTypes = {
  currentGroup: PropTypes.string,
  setGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentGroup: state.createGroup.currentGroup
});

export default connect(
  mapStateToProps,
  { setGroup }
)(MyGroupsList);
