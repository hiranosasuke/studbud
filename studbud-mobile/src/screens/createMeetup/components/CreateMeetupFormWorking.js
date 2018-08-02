import React from 'react';
import { View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-native-elements';

import { TextInputWithValidations } from '../../../commons';
import { createMeetupValidations } from '../validations';
import Colors from '../../../../constants/Colors';
import styles from './styles/CreateMeetupForm';

const CreateMeetupForm = ({
  createMeetup,
  checkTitle,
  showDateTimePicker,
  handlerFocus,
  handlerBlur,
  handleSubmit,
  invalid,
  submitting,
}) => (
  <View style={styles.container}>
    <Field
      component={TextInputWithValidations}
      name="title"
      label="Meetup Title"
      placeholder='Title your meetup...'
      selectionColor={Colors.redColor}
      containerStyle={styles.item}
      inputStyle={{width: undefined, height: undefined, paddingBottom:5, paddingLeft:3}}
      paddingBottom={5}
    />
    <Field
      component={TextInputWithValidations}
      name="description"
      label="Description"
      placeholder='Describe your meetup...'
      multiline
      selectionColor={Colors.redColor}
      containerStyle={styles.item}
      inputStyle={{width: undefined, height: undefined, paddingBottom:10, paddingLeft:3}}
      paddingBottom={20}
    />
    <View style={styles.item}>
      <Button
        raised
        onPress={showDateTimePicker}
        title={checkTitle}
        backgroundColor={Colors.$mediumBlue2}
      />
    </View>
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
  form: 'createMeetup',
  validate: createMeetupValidations,
})(CreateMeetupForm);
