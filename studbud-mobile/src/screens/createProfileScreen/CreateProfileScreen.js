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

import { TextInputWithValidations } from "../../commons";
import { createProfileValidations } from "./validations";
import { CreateProfileForm } from "./components";
import { LoadingScreen } from "../../commons";
import { createProfile } from "../profile/actions";
import Colors from "../../../constants/Colors";
import styles from "../createGroup/styles/CreateGroupScreen";

import PropTypes from "prop-types";
import { connect } from "react-redux";

@reduxForm({
  form: "createProfile",
  validate: createProfileValidations
})
class CreateProfileScreen extends Component {
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

  _createProfile = async values => {
    //console.log("user id: ", this.props.loguser.user.id);
    await this.props
      .createProfile({ ...values })
      .catch(err => res.status(404).json(err));
    this.props.navigation.goBack();
  };

  render() {
    const { profile } = this.props;
    if (profile.isLoading) {
      return (
        <View style={styles.root}>
          <LoadingScreen />
        </View>
      );
    }
    return (
      <View style={styles.root}>
        <CreateProfileForm createProfile={this._createProfile} />
      </View>
    );
  }
}
CreateProfileScreen.propTypes = {
  loguser: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  loguser: state.loguser,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile }
)(CreateProfileScreen);

/*@connect(
  state => ({
    group: state.createGroup,
  }),
  { createGroup }
)*/
