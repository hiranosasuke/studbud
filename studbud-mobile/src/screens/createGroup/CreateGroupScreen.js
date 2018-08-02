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

import { TextInputWithValidations } from "../../commons";
import { createGroupValidations } from "./validations";
import { CreateGroupForm } from "./components";
import { LoadingScreen } from "../../commons";
import { createGroup } from "./actions";
import Colors from "../../../constants/Colors";
import styles from "./styles/CreateGroupScreen";

import PropTypes from "prop-types";

@reduxForm({
  form: "createGroup",
  validate: createGroupValidations
})
class CreateGroupScreen extends Component {
  state = {
    //isFocused: true
    isDateTimePickerVisible: false,
    name: "",
    description: ""
  };

  // Don't want to allow user to submit group without filling out required fields
  _checkIfButtonSubmitDisabled() {
    const { name, description } = this.state;

    if (name.length > 5 && description.length > 5) {
      return false;
    }
    return true;
  }

  _createGroup = async values => {
    //console.log("user id: ", this.props.loguser.user.id);
    await this.props
      .createGroup(this.props.loguser.user.id, { ...values })
      .catch(err => res.status(404).json(err));
    this.props.navigation.goBack();
  };

  render() {
    const { group } = this.props;
    if (group.isLoading) {
      return (
        <View style={styles.root}>
          <LoadingScreen />
        </View>
      );
    } else if (group.error.on) {
      return (
        <View style={styles.root}>
          <Text>{group.error.message}</Text>
        </View>
      );
    }
    return (
      <View style={styles.root}>
        <CreateGroupForm createGroup={this._createGroup} />
      </View>
    );
  }
}
CreateGroupScreen.propTypes = {
  loguser: PropTypes.object.isRequired,
  //currentGroup: PropTypes.string,
  createGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  loguser: state.loguser,
  group: state.createGroup
});

export default connect(
  mapStateToProps,
  { createGroup }
)(CreateGroupScreen);

/*@connect(
  state => ({
    group: state.createGroup,
  }),
  { createGroup }
)*/
