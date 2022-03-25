import React, { useState } from "react";
import {
  Text,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import colors from "../config/colors";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import ip from "../config/ip";

const appVersion = 0.3; //variable to store app version number and import it here, or remove

function UserInfoScreen({ navigation }) {

  return (
    <View style={styles.parentContainer}>
      <TouchableOpacity
        style={styles.list}
        onPress={() => navigation.navigate("Account Information")}
      >
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="table-account"
            size={40}
            color={colors.logo_blue}
          />
        </View>
        <Text style={styles.textStyle}> Account Information</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.list}
        onPress={() => {
          Alert.alert("Log out current user?", "Select OK to continue", [
            { text: "Cancel" },
            {
              text: "OK",
              onPress: () => {
                navigation.reset({ index: 0, routes: [{ name: "Welcome" }] });
                global.userID = null;
                global.email = null;
                global.password = null;
              }
            },
          ]);
          global.userID = null;
        }}
      >
        <View style={styles.iconContainer}>
          <Entypo name="log-out" size={40} color={colors.logo_blue} />
        </View>
        <Text style={styles.textStyle}> Log Out</Text>
      </TouchableOpacity>
      <View style={styles.list}>
        <Text>App Version: {appVersion}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    height: "100%",
    backgroundColor: colors.white,
    padding: "2%",
    alignItems: "center",
  },
  list: {
    height: "10%",
    width: "100%",
    padding: "5%",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
  },
  iconContainer: {
    height: 45,
    width: 45,
    alignItems: "center",
  },
  textStyle: {
    color: colors.black,
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
    position: "absolute",
    left: "25%",
  },
  textContainer: {},
});

export default UserInfoScreen;
