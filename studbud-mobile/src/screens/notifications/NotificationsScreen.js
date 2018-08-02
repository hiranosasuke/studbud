import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';

class NotificationsScreen extends Component {
  static navigationOptions = {
    tabBarButtonComponent: TouchableOpacity,
    tabBarIcon: ({ tintColor }) => (
         <Ionicons name="md-notifications" size={30} color={ tintColor } />
       ),
  }

  render() {
    return(
      <View style={{ flex: 1}}>
        <Text>Notifications</Text>
      </View>
    );
  }
}

export default NotificationsScreen;
