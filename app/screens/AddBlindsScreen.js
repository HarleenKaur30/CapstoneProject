import React, { useState } from "react";
import { StyleSheet, NativeModules, SafeAreaView, Text } from "react-native";

import colors from "../config/colors";
import values from "../config/values";
import { Picker } from "@react-native-picker/picker";

function AddBlindsScreen(props) {
  const [country, setCountry] = useState("Unknown");

  return (
    <SafeAreaView style={styles.container}>
      <Picker
        selectedValue={country}
        onValueChange={(value, index) => setCountry(value)}
        mode="dialogue"
        style={styles.picker}
      >
        <Picker.Item label="Please select your country" value="Unknown" />
        <Picker.Item label={values.houses.house1.name} value="Australia" />
        <Picker.Item label={values.houses.house2.name} value="Belgium" />
        <Picker.Item label="Canada" value="Canada" />
        <Picker.Item label="India" value="India" />
        <Picker.Item label="Japan" value="Japan" />
      </Picker>
      <Text style={styles.text}>Your conuntry: {country}</Text>
    </SafeAreaView>
  );
}

const { StatusBarManager } = NativeModules;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    //paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
    padding: "5%",
  },
});

export default AddBlindsScreen;
