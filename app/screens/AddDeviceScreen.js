import React from "react";
import {
  StyleSheet,
  NativeModules,
  Platform,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

import colors from "../config/colors";
import values from "../config/values";

function AddDeviceScreen({ navigation }) {
  return (
    <ScrollView style={{ backgroundColor: colors.white, flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.buttonText}>Add House</Text>
          <TouchableOpacity
            style={styles.button}
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
            <FontAwesome5 name="home" size={100} color={colors.orange} />
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.buttonText}>Add Blinds</Text>
          <TouchableOpacity
            style={styles.button}
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
            <MaterialCommunityIcons
              name="blinds"
              size={100}
              color={colors.orange}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  button: {
    height: 150,
    width: 150,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
    padding: "5%",
    top: "5%",
    backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  buttonText: {
    color: colors.black,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.black,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
  textContainer: {
    height: 200,
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.white,
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    marginTop: "3%",
    position: "relative",
  },
});

export default AddDeviceScreen;
