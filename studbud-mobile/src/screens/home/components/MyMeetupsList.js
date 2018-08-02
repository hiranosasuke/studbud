import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import createStackNavigator from '../../../routes/Navigator';
import styles from './styles/MyMeetupsList';

const MyMeetupsList = ({ meetups, navigation }) => (
  <View style={styles.root}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>My Meetups</Text>
    </View>
    <View style={styles.contentContainer}>
      <ScrollView horizontal>
        {meetups.map((meetup, i) => (
          <TouchableWithoutFeedback key={i} onPress={() => navigation.navigate('CreateMeetup')}>

          <View key={i}  style={styles.meetupCard}>

            <View style={styles.meetupCardTopContainer}>
              <Text style={styles.meetupCardTitle}>
                {meetup.title}
              </Text>
            </View>

            <View style={styles.meetupCardBottomContainer}>
              <Text style={styles.meetupCardMetaName}>
                {meetup.group.name}
              </Text>
              <Text style={styles.meetupsCardMetaDate}>
                {meetup.eventDate}
              </Text>
            </View>


          </View>
        </TouchableWithoutFeedback>

        )).reverse()}
      </ScrollView>
    </View>
  </View>
);

export default MyMeetupsList;
