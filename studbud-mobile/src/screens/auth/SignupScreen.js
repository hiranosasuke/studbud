import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  TextInput
} from "react-native";
import PropTypes from "prop-types";
import Dimensions from "Dimensions";
import { UserApi } from "../../../constants/api";
import { connect } from "react-redux";
import { signup } from "./actions.js";
import { FormValidationMessage } from "react-native-elements";

import Fonts from "../../../constants/Fonts";
import Colors from "../../../constants/Colors";
import usernameImg from "../../../assets/images/username.png";
import passwordImg from "../../../assets/images/password.png";
import emailImg from "../../../assets/images/email.png";
import eyeImg from "../../../assets/images/eye_black.png";

import UserInput from "./UserInput";

const userApi = new UserApi();

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
    height: 40,
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
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: "#ffffff"
  },
  inputWrapper: {
    flex: 0.1,
    paddingBottom: 40
  },
  inlineImg: {
    position: "absolute",
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9
  }
};

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      email: "",
      password: "",
      password2: "",
      name: "",
      errors: {}
    };
    this.showPass = this.showPass.bind(this);
  }

  showPass() {
    this.state.press === false
      ? this.setState({ showPass: false, press: true })
      : this.setState({ showPass: true, press: false });
  }

  _signup = async () => {
    await this.props.signup({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    });
    this.props.navigation.goBack();
  };

  state = {};
  render() {
    return (
      <View style={styles.FlexContainer}>
        <Text style={[Fonts.authTitle, { paddingTop: 20 }]} />

        <KeyboardAvoidingView
          style={styles.FlexContainer2}
          behavior="padding"
          enabled
        >
          <View style={styles.inputWrapper}>
            <Image source={usernameImg} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              autoCorrect={false}
              autoCapitalize={"none"}
              returnKeyType={"done"}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              value={this.state.name}
              onChangeText={text => {
                this.setState({ name: text });
              }}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Image source={emailImg} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCorrect={false}
              autoCapitalize={"none"}
              returnKeyType={"done"}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              value={this.state.email}
              onChangeText={text => {
                this.setState({ email: text });
              }}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Image source={passwordImg} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={this.state.showPass}
              autoCorrect={false}
              autoCapitalize={"none"}
              returnKeyType={"done"}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              value={this.state.password}
              onChangeText={text => {
                this.setState({ password: text });
              }}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Image source={passwordImg} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={this.state.showPass}
              autoCorrect={false}
              autoCapitalize={"none"}
              returnKeyType={"done"}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              value={this.state.password2}
              onChangeText={text => {
                this.setState({ password2: text });
              }}
            />

            {this.state.password2 &&
            this.state.password2 != this.state.password ? (
              <FormValidationMessage
                labelStyle={{
                  color: Colors.$errorRed,
                  paddingBottom: 8,
                  paddingLeft: 8
                }}
              >
                Passwords do not match!
              </FormValidationMessage>
            ) : null}
          </View>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={1}
            onPress={this._signup}
          >
            <Text style={styles.text}>GET STARTED</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

        <View style={styles.BottomButtonWrapper} />
      </View>
    );
  }
}

SignupScreen.propTypes = {
  signup: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { signup }
)(SignupScreen);
