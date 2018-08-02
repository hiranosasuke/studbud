import React from "react";
import { View } from "react-native";
import { Field, reduxForm } from "redux-form";
import { Button } from "react-native-elements";

import { TextInputWithValidations } from "../../../commons";
import { createMeetupValidations } from "../validations";
import Colors from "../../../../constants/Colors";
import styles from "./styles/CreateMeetupForm";
import DateTimePicker from "react-native-modal-datetime-picker";
import {
  FormInput,
  FormLabel,
  FormValidationMessage
} from "react-native-elements";
import DatePicker from "react-native-datepicker";
import moment from "moment";

const renderDateField = ({
  input: { onChange, value, ...restInput },
  label,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <View>
      <FormLabel>{label}</FormLabel>
      <DatePicker
        style={{ width: 300 }}
        date={value}
        mode="datetime"
        is24Hour={false}
        placeholder="Select Meetup Date"
        //format="YYYY-MM-DD"
        //format="MMMM Do YYYY, h:mm A"
        minDate={moment().toDate()}
        //confirmBtnText="Confirm"
        //cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: "absolute",
            left: 20,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 56
          }
        }}
        onDateChange={onChange}
      />
      {touched &&
        (error && <FormValidationMessage>{error}</FormValidationMessage>)}
    </View>
  );
};

const CreateMeetupForm = ({
  createMeetup,
  groupID,
  //checkTitle,
  //showDateTimePicker,
  //handlerFocus,
  //handlerBlur,
  handleSubmit,
  invalid,
  submitting
}) => (
  <View style={styles.container}>
    <Field
      component={TextInputWithValidations}
      name="title"
      label="Meetup Title"
      placeholder="Title your meetup..."
      selectionColor={Colors.redColor}
      containerStyle={styles.item}
      inputStyle={{
        width: undefined,
        height: undefined,
        paddingBottom: 5,
        paddingLeft: 3
      }}
      paddingBottom={5}
    />
    <Field
      component={TextInputWithValidations}
      name="description"
      label="Description"
      placeholder="Describe your meetup..."
      multiline
      selectionColor={Colors.redColor}
      containerStyle={styles.item}
      inputStyle={{
        width: undefined,
        height: undefined,
        paddingBottom: 10,
        paddingLeft: 3
      }}
      paddingBottom={20}
    />
    <Field
      component={renderDateField}
      name="eventDate"
      //label="Date"
    />

    <View style={styles.buttonCreate}>
      <Button
        backgroundColor={Colors.$darkBlue}
        title="Create Meetup"
        raised
        disabled={invalid || submitting}
        onPress={handleSubmit(createMeetup)}
      />
    </View>
  </View>
);

export default reduxForm({
  form: "createMeetup",
  validate: createMeetupValidations
})(CreateMeetupForm);
