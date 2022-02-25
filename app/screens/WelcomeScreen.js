import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import colors from "../config/colors";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      blurRadius={7}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <Image
        style={styles.logo}
        source={require("../assets/logoNoBackground.png")}
      />
      <Text numberOfLines={1} style={styles.description}>
        Stop Shades Idling
      </Text>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }], // temporary direct navigation to home screen, to be replaced with authorization
          })
        }
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  description: {
    color: colors.black,
    position: "absolute",
    top: 175,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 20,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  loginButton: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
    backgroundColor: colors.logo_blue,
  },
  loginText: {
    color: colors.white,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
    fontSize: 16,
  },
  logo: {
    width: 150,
    height: 150,
    position: "absolute",
    top: 50,
  },
});

export default WelcomeScreen;
