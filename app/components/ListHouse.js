import React from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import colors from "../config/colors";

function ListHouse({ houseName, numberBlinds, onPress }) {
  return (
    <TouchableHighlight onPress={onPress} underlayColor={colors.silvergray}>
      <View style={styles.container}>
        <FontAwesome5 name="home" size={40} color={colors.orange} />
        <View style={styles.textContainer}>
          <Text style={styles.houseNameText}>{houseName}</Text>
          <Text style={styles.blindsText}>
            Number of Blinds: {numberBlinds}/10
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  blindsText: {
    color: colors.medium,
    fontSize: 13,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontStyle: "italic",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    padding: "5%",
    backgroundColor: colors.white,
  },
  houseNameText: {
    color: colors.dark,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
  textContainer: {
    paddingLeft: "5%",
  },
});

export default ListHouse;
