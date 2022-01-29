import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../config/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

function ListItemDeleteAction({ onPress }) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPress}>
        <Feather name="delete" size={35} color={colors.white} />
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.orangereddelete,
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
  },
  deleteText: {
    color: colors.white,
    fontSize: 15,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
});

export default ListItemDeleteAction;
