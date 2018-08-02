import React from "react";
import { View, ScrollView } from "react-native";
import { Field, FieldArray, reduxForm } from "redux-form";
import { Button } from "react-native-elements";

import { TextInputWithValidations } from "../../../commons";
import { createProfileValidations } from "../validations";
import Colors from "../../../../constants/Colors";
import styles from "../../createGroup/components/styles/CreateGroupForm";
import {
  FormInput,
  FormLabel,
  FormValidationMessage
} from "react-native-elements";
import TagInput from "react-native-tag-input";

const CreateProfileForm = ({
  createProfile,
  handleSubmit,
  invalid,
  submitting
}) => (
  <View style={styles.container}>
    <ScrollView style={{ flex: 0.7, marginTop: 20 }}>
      <Field
        component={TextInputWithValidations}
        name="handle"
        label="Handle"
        placeholder="Choose a handle"
        selectionColor={Colors.redColor}
        containerStyle={{ paddingBottom: 0, paddingTop: 0, marginVertical: 0 }}
        inputStyle={{
          width: undefined,
          height: undefined,
          paddingBottom: 5,
          paddingLeft: 3
        }}
      />
      <Field
        component={TextInputWithValidations}
        name="location"
        label="Location"
        placeholder="Enter your location"
        selectionColor={Colors.redColor}
        containerStyle={{ marginVertical: 2, paddingBottom: 0 }}
        inputStyle={{
          width: undefined,
          height: undefined,
          paddingBottom: 10,
          paddingLeft: 3
        }}
      />
      <Field
        component={TextInputWithValidations}
        name="status"
        label="Status"
        placeholder="Enter your status"
        selectionColor={Colors.redColor}
        containerStyle={{ marginVertical: 2, paddingBottom: 0 }}
        inputStyle={{
          width: undefined,
          height: undefined,
          paddingBottom: 5,
          paddingLeft: 3
        }}
      />

      <Field
        component={TextInputWithValidations}
        name="skills"
        label="Skills"
        placeholder="Enter skills separated by commas"
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
        name="bio"
        label="Bio"
        placeholder="Enter your bio"
        multiline
        returnKeyType="done"
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
    </ScrollView>
    <View style={styles.buttonCreate}>
      <Button
        backgroundColor={Colors.$darkBlue}
        title="Create Profile"
        raised
        disabled={invalid || submitting}
        onPress={handleSubmit(createProfile)}
      />
    </View>
    <View style={{ flex: 1 }} />
  </View>
);

export default reduxForm({
  form: "createProfile",
  validate: createProfileValidations
})(CreateProfileForm);
