/* This screen opens if the customer is not logged in and wishes to login in (has already registered)*/

import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

import colors from "../config/colors";
import ip from "../config/ip";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  SearchRecord = () => {
    var SearchAPIURL =
      "http://" + ip.ip + ":" + ip.port + "/api/search_login.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var data = {
      FindEmail: email,
      FindPassword: password,
    };

    fetch(SearchAPIURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        global.userID = response[0].userID;
      })
      .catch((error) => {
        Alert.alert("Login Failed", "Error" + error, [{ text: "Ok" }]);
      });
    if (global.userID !== null) {
      SearchHouses();
    } else {
      Alert.alert(
        "Login Failed",
        "Email or password was incorrect. Please try again.",
        [{ text: "Ok" }]
      );
    }
  };

  SearchHouses = () => {
    var SearchAPIURL = "http://192.168.1.67:80/api/search_existing_houses.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var data = {
      FindUserID: global.userID,
    };

    fetch(SearchAPIURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        var numHouses = Number(response[0].numHouses.toString());
        response.shift();
        navigation.navigate("Home", {
          screen: "Home",
          params: { houses: response, numHouses: numHouses },
        });
      })
      .catch((error) => {
        Alert.alert("App Could Not be Loaded", "Error" + error, [
          { text: "Ok" },
        ]);
      });
  };

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

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => SearchRecord(email, password)}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Register" }], // temporary direct navigation to home screen, to be replaced with authorization
          })
        }
      >
        <Text style={styles.registerText}>REGISTER</Text>
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
    marginTop: "-25%",
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
    backgroundColor: colors.logo_blue,
  },

  //Style for the login text
  loginText: {
    color: colors.white,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
    fontSize: 16,
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

export default LoginScreen;
