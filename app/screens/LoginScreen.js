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

import colors from "../config/colors";


function LoginScreen({navigation}) {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

return (
<View style={styles.parentContainer} >
  <View style={styles.imageContainer}>
    <Image style={styles.image} source={require("../assets/logo.png")} />
  </View>


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
        <Text style={styles.forgotButton}>Forgot Password</Text>
      </TouchableOpacity>


      <TouchableOpacity 
        style={styles.loginButton}
        onPress={() => 
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }], // temporary direct navigation to home screen, to be replaced with authorization
          })
        }>
        <Text style={styles.textInput}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 0,
    width: "100%",
    alignItems: "center",
    height: "100%",
  },
  imageContainer: {
    width: "100%",
    height: 250,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  image: { //Style for the AI Shading logo
    width: 250,
    height: 250,
  },

  inputView: {//Style for the container that contains the Email and Password
    backgroundColor: colors.light,
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    borderColor: colors.orange,
    borderWidth: 2,
    justifyContent: "center",
  },
  textInput: { //Style for the text for Email and Password
    color: colors.black,
    fontSize: 14,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
  forgotButton: { //Style for the forgot password button
    height: 30,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    //marginBottom: 30,
  },
  loginButton: { //Style for the login button
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15%",
    backgroundColor: colors.logo_blue,
  },
});

export default LoginScreen;
