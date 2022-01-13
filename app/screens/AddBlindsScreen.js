import React from "react";
import {
  Text,
  StyleSheet,
  NativeModules,
  SafeAreaView,
  Platform,
} from "react-native";
import Tabs from "./Tabs";

import colors from "../config/colors";

function AddBlindsScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Add Blinds</Text>
    </SafeAreaView>
  );
}

const { StatusBarManager } = NativeModules;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    //paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
    padding: 20,
  },
});

export default AddBlindsScreen;
