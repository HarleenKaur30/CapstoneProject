/* This screen opens if the customer is not logged in and wishes to login in (has already registered)*/

import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

import colors from "../config/colors";

function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");

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
          placeholder="Enter Password"
          placeholderTextColor={colors.silvergray}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Re-enter Password"
          placeholderTextColor={colors.silvergray}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Welcome" }], // temporary direct navigation to home screen, to be replaced with authorization
          })
        }
      >
        <Text style={styles.registerText}>FINISH REGISTERATION</Text>
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
    width: 170,
    height: 160,
    //position: "absolute",
    //top: 100,
    marginTop: "-35%",
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

  //Style for the register button
  registerButton: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: colors.darkorange,
  },

  //Style for the register text
  registerText: {
    color: colors.white,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default RegisterScreen;
