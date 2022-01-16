import React from "react";
import {
  StyleSheet,
  NativeModules,
  SafeAreaView,
  Platform,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
<link
  href="https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto+Slab|Roboto:300,400,500,700"
  rel="stylesheet"
/>;

import colors from "../config/colors";
import values from "../config/values";

function AddDeviceScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.addHouse}
        onPress={() => {
          values.maxNumberOfHouses === values.houses.number
            ? Alert.alert(
                "House Could Not Be Added",
                "The maximum number of houses have already been added using this device.",
                [{ text: "Ok" }]
              )
            : navigation.navigate("Add House");
        }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>Add House</Text>
        </View>
        <MaterialCommunityIcons
          name="plus"
          size={50}
          style={styles.plusContainer}
        />
        <FontAwesome5 name="home" size={150} color={colors.orange} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addBlinds}
        onPress={() => {
          values.houses.number === 0
            ? Alert.alert(
                "Blinds Could Not Be Added",
                "Please add a house first.",
                [
                  { text: "Cancel" },
                  {
                    text: "Add House",
                    onPress: () => navigation.navigate("Add House"),
                  },
                ]
              )
            : navigation.navigate("Choose House");
        }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>Add Blinds</Text>
        </View>
        <MaterialCommunityIcons
          name="plus"
          size={50}
          style={styles.plusContainer}
        />
        <MaterialCommunityIcons
          name="blinds"
          size={150}
          color={colors.orange}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const { StatusBarManager } = NativeModules;
const styles = StyleSheet.create({
  addHouse: {
    height: "47.5%",
    width: "100%",
    borderWidth: 5,
    borderRadius: 25,
    borderColor: colors.medium,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
  },
  addBlinds: {
    height: "47.5%",
    width: "100%",
    borderWidth: 5,
    borderRadius: 25,
    borderColor: colors.medium,
    alignItems: "center",
    justifyContent: "center",
  },
  plusContainer: {
    position: "absolute",
    right: "5%",
    top: "5%",
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: "5%",
  },
  text: {
    color: colors.black,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
  textContainer: {
    height: "10%",
    position: "absolute",
    top: "5%",
    left: "5%",
  },
});

export default AddDeviceScreen;
