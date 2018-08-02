import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { reduxForm, Field } from "redux-form";
import { Icon } from "native-base";
import {
  FormLabel,
  FormInput,
  Button,
  FormValidationMessage
} from "react-native-elements";
import { connect } from "react-redux";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

import { TextInputWithValidations } from "../../commons";
import { createMeetupValidations } from "./validations";
import { CreateMeetupForm } from "./components";
import { LoadingScreen } from "../../commons";
import { createMeetup } from "./actions";
import Colors from "../../../constants/Colors";
import styles from "./styles/CreateMeetupScreen";

@connect(
  state => ({
    meetup: state.createMeetup
  }),
  { createMeetup }
)
@reduxForm({
  form: "createMeetup",
  validate: createMeetupValidations
})
export default class CreateMeetupScreen extends Component {
  state = {
    //isFocused: true
    isDateTimePickerVisible: false,
    date: moment(),
    //date: new Date(),
    title: "",
    description: ""
  };

  _handlerFocus = input => {
    this.setState({
      [input]: true
    });
  };

  _handlerBlur = input => {
    this.setState({
      [input]: false
    });
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _handleDateTimePicker = () =>
    this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({ date });
    this._handleDateTimePicker();
  };

  _checkTitle() {
    const { date } = this.state;
    // If date when component is mounted is bigger than now,
    // Display chosen meetup date
    if (date > moment()) {
      return moment(date).format("MMMM Do YYYY, h:mm A");
    }
    // Otherwise, a date hasn't been chosen yet
    return "Pick a Meetup Date";
  }

  // Don't want to allow user to submit meetup without filling out required fields
  _checkIfButtonSubmitDisabled() {
    const { title, description, date } = this.state;

    if (title.length > 5 && description.length > 5 && date > moment()) {
      return false;
    }
    return true;
  }

  // changeTitle takes title as argument and changes title state
  _changeTitle = title => this.setState({ title });

  _changeDescription = description => this.setState({ description });

  _createMeetup = async values => {
    await this.props.createMeetup(values);
    this.props.navigation.goBack();
  };

  render() {
    const { meetup } = this.props;
    if (meetup.isLoading) {
      return (
        <View style={styles.root}>
          <LoadingScreen />
        </View>
      );
    } else if (meetup.error.on) {
      return (
        <View style={styles.root}>
          <Text>{meetup.error.message}</Text>
        </View>
      );
    }
    return (
      <View style={styles.root}>
        <CreateMeetupForm
          createMeetup={this._createMeetup}
          //showDateTimePicker={this._showDateTimePicker}
          //checkTitle={this._checkTitle()}
          //handlerFocus={this._handlerFocus}
          //handlerBlur={this._handlerBlur}
        />

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._handleDateTimePicker}
          minimumDate={moment().toDate()}
          mode="datetime"
          is24Hour={false}
        />
      </View>
    );
  }
}
