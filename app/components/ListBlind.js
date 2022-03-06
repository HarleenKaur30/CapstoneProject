import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import colors from "../config/colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ListBlind({
  blindName,
  openPercentage,
  blindGroup,
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
            <MaterialCommunityIcons
              name="blinds"
              size={40}
              color={colors.logo_blue}
            />
            <View style={styles.textContainer}>
              <Text style={styles.blindNameText}>{blindName}</Text>
              <Text style={styles.blindsInfo}>
                {openPercentage}% open, Group: {blindGroup}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  blindsInfo: {
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
  blindNameText: {
    color: colors.dark,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
  textContainer: {
    paddingLeft: "5%",
  },
});

export default ListBlind;
