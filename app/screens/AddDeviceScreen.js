import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

import colors from "../config/colors";
import ip from "../config/ip";
import values from "../config/values";
import housesTest from "../config/houses";

function AddDeviceScreen({ navigation }) {
  SearchRecord = () => {
    var SearchAPIURL =
      "http://" + ip.ip + ":" + ip.port + "/api/search_existing_houses.php";
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
        if (Number(response[0].numHouses.toString()) === 0) {
          Alert.alert(
            "Blinds Could Not Be Added",
            "Please add a house first.",
            [
              { text: "Cancel" },
              {
                text: "Add House",
                onPress: () => navigation.navigate("Add House"),
              },
            ]
          );
        } else {
          response.shift();
          navigation.navigate("Choose House", { houses: response });
        }
      })
      .catch((error) => {
        Alert.alert("Blinds Could Not Be Added", "Error" + error, [
          { text: "Ok" },
        ]);
      });
  };

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
            <FontAwesome5 name="home" size={100} color={colors.logo_blue} />
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.buttonText}>Add Blinds</Text>
          <TouchableOpacity style={styles.button} onPress={SearchRecord}>
            <MaterialCommunityIcons
              name="blinds"
              size={100}
              color={colors.logo_blue}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    paddingTop: "5%",
    justifyContent: "center",
    alignItems: "center",
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
