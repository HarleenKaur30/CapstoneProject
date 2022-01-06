
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



function LoginScreen(props) {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

return (
<View style={styles.container}>
      <Image style={styles.image} source={require("../assets/AIShadingLogo.jpg")} />

      <StatusBar style="auto" />
      
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor= "#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotButton}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton}>
        <Text>LOGIN</Text>
      </TouchableOpacity>
    </View>
    );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: "#e6e6fa",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  //Style for the text for Email and Password
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  //Style for the forgot password button
  forgotButton: {
    height: 30,
    marginBottom: 30,
  },

  //Style for the login button
  loginButton: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#9370db",
  },
});

export default LoginScreen;