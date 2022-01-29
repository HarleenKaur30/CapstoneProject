import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import colors from "../config/colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function ListHouse({
  houseName,
  numberBlinds,
  onPress,
  onLongPress,
  renderRightActions,
  renderLeftActions,
}) {
  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
      >
        <TouchableHighlight
          onPress={onPress}
          onLongPress={onLongPress}
          underlayColor={colors.silvergray}
        >
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
      </Swipeable>
    </GestureHandlerRootView>
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
