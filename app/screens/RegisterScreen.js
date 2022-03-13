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

function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");
  const [emailExists, setEmailExists] = useState("");

  SearchRecord = () => {
    var SearchAPIURL =
      "http://" + ip.ip + ":" + ip.port + "/api/search_email.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var data = {
      FindEmail: email,
    };

    fetch(SearchAPIURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        Alert.alert(
          "Finish Registering",
          "Click to confirm that information is correct.",
          [
            {
              text: "Ok",
              onPress: () => {
                setEmailExists(response[0].emailExists.toString());
                InsertRecord(email, password, reenteredPassword);
              },
            },
            { text: "Cancel" },
          ]
        );
      })
      .catch((error) => {
        Alert.alert(
          "Registration Failed",
          "Error: " + error + ". Please try again later.",
          [{ text: "Ok" }]
        );
      });
  };

  InsertRecord = () => {
    if (emailExists > 0) {
      Alert.alert(
        "Registration Failed",
        "This email has already been registered.",
        [{ text: "Ok" }]
      );
    } else {
      var finalPassword = "";
      if (
        password === reenteredPassword &&
        password.length > 0 &&
        password.length < 31
      ) {
        finalPassword = password;
        if (email.length == 0 || finalPassword.length == 0) {
          Alert.alert(
            "Registration Failed",
            "One or more required fields are missing.",
            [{ text: "Ok" }]
          );
        } else {
          {
            var InsertAPIURL =
              "http://" + ip.ip + ":" + ip.port + "/api/register.php";

            var headers = {
              Accept: "application/json",
              "Content-Type": "application/json",
            };

            var data = {
              email: email,
              password: finalPassword,
            };

            fetch(InsertAPIURL, {
              method: "POST",
              headers: headers,
              body: JSON.stringify(data),
            })
              .then((response) => response.json())
              .then((response) => {
                Alert.alert("Registered", response[0].Message, [
                  {
                    text: "Ok",
                    onPress: () =>
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "Welcome" }], // direct navigation back to welcome screen
                      }),
                  },
                ]);
              })
              .catch((error) => {
                alert("Error" + error);
              });
          }
        }
      } else {
        Alert.alert(
          "Registration Failed",
          "Please ensure that password match and are between 1 and 30 characters.",
          [
            {
              text: "Ok",
            },
          ]
        );
      }
    }
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
          onChangeText={(reenteredPassword) =>
            setReenteredPassword(reenteredPassword)
          }
        />
      </View>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => SearchRecord(email, password, reenteredPassword)}
      >
        <Text style={styles.registerText}>REGISTER</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        }
      >
        <Text style={styles.registerText}>LOGIN</Text>
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

  loginButton: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: colors.logo_blue,
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
