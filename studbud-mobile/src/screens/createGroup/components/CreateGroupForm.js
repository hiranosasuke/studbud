import React from "react";
import { View } from "react-native";
import { Field, FieldArray, reduxForm } from "redux-form";
import { Button } from "react-native-elements";

import { TextInputWithValidations } from "../../../commons";
import { createGroupValidations } from "../validations";
import Colors from "../../../../constants/Colors";
import styles from "./styles/CreateGroupForm";
import {
  FormInput,
  FormLabel,
  FormValidationMessage
} from "react-native-elements";
import TagInput from "react-native-tag-input";

/*const tagInput = ({
  input: { value, onChange ...restInput },
  meta: { touched, error },
  ...custom
}) => {
  return (
    <Tags
      initialText="Enter tags..."
      //initialTags={["dog", "cat", "chicken"]}
      onChangeTags={tags => console.log(tags)}
      onTagPress={(index, tagLabel, event) =>
        console.log(index, tagLabel, event)
      }
      
    />
    <TagsInput value={value || []} onChange={this.onChange.bind(this)} onlyUnique />
  );
};*/

const CreateGroupForm = ({
  createGroup,
  handleSubmit,
  invalid,
  submitting
}) => (
  <View style={styles.container}>
    <Field
      component={TextInputWithValidations}
      name="name"
      label="Group Name"
      placeholder="Name your group..."
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
      placeholder="Describe your group..."
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
      component={TextInputWithValidations}
      name="location"
      label="Location"
      placeholder="Enter group location"
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
      name="tags"
      label="Tags"
      placeholder="Enter tags separated by commas"
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

    <View style={styles.buttonCreate}>
      <Button
        backgroundColor={Colors.$darkBlue}
        title="Create Group"
        raised
        disabled={invalid || submitting}
        onPress={handleSubmit(createGroup)}
      />
    </View>
  </View>
);

export default reduxForm({
  form: "createGroup",
  validate: createGroupValidations
})(CreateGroupForm);
