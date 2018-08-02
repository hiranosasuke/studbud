import React from "react";
import { View } from "react-native";
import { Field, reduxForm } from "redux-form";
import { Button } from "react-native-elements";

import { TextInputWithValidations } from "../../../commons";
import { signupValidations } from "../validations";
import Colors from "../../../../constants/Colors";
import {
  FormInput,
  FormLabel,
  FormValidationMessage
} from "react-native-elements";

const signupForm = ({ signup, handleSubmit, invalid, submitting }) => (
  <View>
    <KeyboardAvoidingView
      style={styles.FlexContainer2}
      behavior="padding"
      enabled
    >
      <View style={styles.inputWrapper}>
        <Image source={passwordImg} style={styles.inlineImg} />
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
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={1}
        onPress={() =>
          userApi.signup({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
          })
        }
      >
        <Text style={styles.text}>GET STARTED</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>

    <View style={styles.BottomButtonWrapper} />

    <View style={styles.container}>
      <Field
        component={TextInputWithValidations}
        name="name"
        label="Name"
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

      <View style={styles.buttonCreate}>
        <Button
          backgroundColor={Colors.$darkBlue}
          title="Create Group"
          raised
          disabled={invalid || submitting}
          onPress={handleSubmit(signup)}
        />
      </View>
    </View>
  </View>
);

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

export default reduxForm({
  form: "signup",
  validate: signupValidations
})(signupForm);
