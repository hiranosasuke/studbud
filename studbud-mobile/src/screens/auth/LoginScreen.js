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
import { connect } from "react-redux";
import { login } from "./actions.js";

import Fonts from "../../../constants/Fonts";
import Colors from "../../../constants/Colors";
import usernameImg from "../../../assets/images/username.png";
import passwordImg from "../../../assets/images/password.png";
import eyeImg from "../../../assets/images/eye_black.png";

import UserInput from "./UserInput";

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
    paddingLeft: 130,
    paddingRight: 130
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
  },
  inlineImg2: {
    width: 22,
    height: 22,
    tintColor: "rgba(0,0,0,0.2)"
  },
  eyeHolder: {
    position: "absolute",
    zIndex: 99,
    right: 35,
    top: 9
  }
};

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      email: "",
      password: "",
      errors: {}
    };
    this.showPass = this.showPass.bind(this);
  }

  showPass() {
    this.state.press === false
      ? this.setState({ showPass: false, press: true })
      : this.setState({ showPass: true, press: false });
  }

  _login = async () => {
    await this.props.login({
      email: this.state.email,
      password: this.state.password
    });
    this.props.navigation.goBack();
  };

  state = {};
  render() {
    const { user } = this.props.loguser;
    return (
      <View style={styles.FlexContainer}>
        <View style={styles.FlexContainer}>
          <Image
            source={require("../../../assets/appiconfix.png")}
            style={{ width: 180, height: 170, marginTop: 10 }}
          />
          <Text style={Fonts.authTitle}>StudBud.</Text>
        </View>

        <KeyboardAvoidingView
          style={styles.FlexContainer2}
          behavior="padding"
          enabled
        >
          <View style={styles.inputWrapper}>
            <Image source={usernameImg} style={styles.inlineImg} />
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
            <TouchableOpacity
              style={styles.eyeHolder}
              activeOpacity={0.7}
              onPress={this.showPass}
            >
              <Image source={eyeImg} style={styles.inlineImg2} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={1}
            onPress={this._login}
          >
            <Text style={styles.text}>LOGIN</Text>
          </TouchableOpacity>

          <Text
            style={styles.text2}
            onPress={() => this.props.navigation.navigate("Signup")}
          >
            Don't have an account?{" "}
            <Text style={{ textDecorationLine: "underline" }}>Sign up!</Text>
          </Text>
        </KeyboardAvoidingView>

        <View style={styles.BottomButtonWrapper} />
      </View>
    );
  }
}

LoginScreen.propTypes = {
  login: PropTypes.func.isRequired,
  loguser: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  loguser: state.loguser
});

export default connect(
  mapStateToProps,
  { login }
)(LoginScreen);
