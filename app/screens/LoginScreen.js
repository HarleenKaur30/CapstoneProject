/* This screen opens if the customer is not logged in and wishes to login in (has already registered)*/

import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

import colors from "../config/colors";

function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo.png")} />

      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor={colors.silvergray}
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor={colors.silvergray}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotButton}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  //Style for the AI Shading logo
  image: {
    width: 124,
    height: 100,
    position: "absolute",
    top: 100,
  },

  //Style for the container that contains the Email and Password
  inputView: {
    backgroundColor: colors.light,
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    //alignItems: "center",
  },

  //Style for the text for Email and Password
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },

  //Style for the forgot password button
  forgotButton: {
    height: 30,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    //marginBottom: 30,
  },

  //Style for the login button
  loginButton: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: colors.cornflowerblue,
  },

  //Style for the login text
  loginText: {
    color: colors.white,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LoginScreen;
