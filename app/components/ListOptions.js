import React from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function ListOptions({ optionName, iconName, onPress }) {
  return (
    <TouchableHighlight onPress={onPress} underlayColor={colors.silvergray}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name={iconName}
          size={40}
          color={colors.orange}
        />
        <Text style={styles.optionNameText}>{optionName}</Text>
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
  optionNameText: {
    color: colors.dark,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
    paddingLeft: "5%",
  },
});

export default ListOptions;
