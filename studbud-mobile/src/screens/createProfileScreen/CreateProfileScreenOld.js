import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput
} from "react-native";
import { reduxForm, Field } from "redux-form";
import { Icon } from "native-base";
import {
  FormLabel,
  FormInput,
  Button,
  FormValidationMessage
} from "react-native-elements";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createProfile } from "../profile/actions";
//import { createProfileValidations } from "./validations";
//import { CreateProfileForm } from "./components";

import { LoadingScreen } from "../../commons";
//import styles from "./styles/CreateGroupScreen";
import Colors from "../../../constants/Colors";
import { TextInputWithValidations } from "../../commons";
import TextField from "./TextField";
import validation from "./validation";
import validate from "./validationwrapper";

const styles = {
  FlexContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "white"
  },
  FlexContainer2: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 10
  },
  BottomButtonWrapper: {
    flex: 0.2,
    flexDirection: "row"
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: "center",
    position: "absolute",
    bottom: 20
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: "rgba(0,0,0,0.2)"
  },
  btnEye: {
    position: "absolute",
    top: 70,
    right: 30,
    paddingBottom: 70
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.$darkBlue,
    height: 25,
    borderRadius: 20,
    zIndex: 100
  },
  text: {
    color: "white",
    backgroundColor: "transparent",
    paddingLeft: 110,
    paddingRight: 110
  },
  text2: {
    position: "absolute",
    color: Colors.$navigationTint,
    backgroundColor: "transparent",
    bottom: 20
  },
  input: {
    backgroundColor: "rgba(105, 105, 105, 0.25)",
    width: 300,
    height: 30,
    marginHorizontal: 10,
    paddingLeft: 10,
    borderRadius: 5,
    color: "#ffffff"
  },
  inputWrapper: {
    //flex: 0.1,
    paddingBottom: 7
  },
  inlineImg: {
    position: "absolute",
    zIndex: 99,
    width: 22,
    height: 22,
    top: 9
  }
};

class CreateProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      location: "",
      status: "",
      skills: "",
      bio: "",

      handleError: "",
      statusError: "",
      skillsError: "",
      errors: {}
    };
  }

  async _profileSubmit() {
    const profileData = {
      handle: this.state.handle,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      bio: this.state.bio
    };

    console.log(this.state.handle);

    //this.props.createProfile(profileData);

    await this.props
      .createProfile(profileData)
      .catch(err => res.status(404).json(err));
    this.props.navigation.goBack();
  }

  render() {
    const { profile } = this.props;

    return (
      <View style={styles.FlexContainer}>
        <KeyboardAvoidingView
          style={styles.FlexContainer2}
          behavior="padding"
          enabled
        >
          <Text
            style={{
              textAlign: "left",
              alignSelf: "stretch",
              paddingLeft: 15,
              fontSize: 11,
              color: Colors.$navigationTint
            }}
          >
            Handle
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Choose a handle"
              autoCorrect={false}
              autoCapitalize={"none"}
              returnKeyType={"done"}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              value={this.state.handle}
              onChangeText={text => {
                this.setState({ handle: text });
              }}
            />
          </View>

          <Text
            style={{
              textAlign: "left",
              alignSelf: "stretch",
              paddingLeft: 15,
              fontSize: 11,
              color: Colors.$navigationTint
            }}
          >
            Status
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your current status"
              autoCorrect={false}
              autoCapitalize={"none"}
              returnKeyType={"done"}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              value={this.state.status}
              onChangeText={text => {
                this.setState({ status: text });
              }}
            />
          </View>

          <Text
            style={{
              textAlign: "left",
              alignSelf: "stretch",
              paddingLeft: 15,
              fontSize: 11,
              color: Colors.$navigationTint
            }}
          >
            Skills
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your skills separated by commas"
              autoCorrect={false}
              autoCapitalize={"none"}
              returnKeyType={"done"}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              value={this.state.skills}
              onChangeText={text => {
                this.setState({ skills: text });
              }}
            />
          </View>

          <Text
            style={{
              textAlign: "left",
              alignSelf: "stretch",
              paddingLeft: 15,
              fontSize: 11,
              color: Colors.$navigationTint
            }}
          >
            Location
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your location"
              autoCorrect={false}
              multiline={false}
              autoCapitalize={"none"}
              returnKeyType={"done"}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              value={this.state.location}
              onChangeText={text => {
                this.setState({ location: text });
              }}
            />
          </View>

          <Text
            style={{
              textAlign: "left",
              alignSelf: "stretch",
              paddingLeft: 15,
              fontSize: 11,
              color: Colors.$navigationTint
            }}
          >
            User Bio
          </Text>
          <View style={{ paddingBottom: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Enter a bio"
              autoCorrect={false}
              multiline={true}
              autoCapitalize={"none"}
              returnKeyType={"done"}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              value={this.state.bio}
              onChangeText={text => {
                this.setState({ bio: text });
              }}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={1}
            onPress={this._profileSubmit}
          >
            <Text style={styles.text}>CREATE PROFILE</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

        <View style={styles.BottomButtonWrapper} />
      </View>
    );
  }
}

CreateProfileScreen.propTypes = {
  profile: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
  //errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
  //errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(CreateProfileScreen);
