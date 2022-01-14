import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../config/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

function ListItemEditAction({ onPress }) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPress}>
        <Feather name="edit" size={35} color={colors.white} />
        <Text style={styles.deleteText}>Edit</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.orangeyellow,
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
  },
  deleteText: {
    //paddingLeft: "10%",
    color: colors.white,
    fontSize: 15,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
});

export default ListItemEditAction;