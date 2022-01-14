import React, { useState } from "react";
import { Text, View, NativeModules, StyleSheet, SafeAreaView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import DropDownPicker from 'react-native-dropdown-picker'
import AppTextInput from "../components/AppTextInput";

function AddHouseScreen(props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Edmonton', value: 'Edmonton'},
    {label: 'Calgary', value: 'Calgary'},
    {label: 'Toronto', value: 'Toronto'},
    {label: 'Vancouver', value: 'Vancouver'},
  ]);

  return (
    <View style={styles.container}>
      
      <View style={styles.locationWrapper}>
      <Text style={styles.sectionTitle}>Location</Text>
      </View>

      <MaterialCommunityIcons
          name="map-marker"
          size={40}
          style={styles.mapmarkerContainer}
          color={colors.orange}
        />

      <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems} />

      <View style={styles.usualtempWrapper}>
      <Text style={styles.sectionTitle}>Usual Temperature</Text>
      </View>
      
      <AppTextInput placeholder="Input Temperature" icon="thermometer"/>

      <View style={styles.desiredtempWrapper}>
      <Text style={styles.sectionTitle}>Desired Temperature</Text>
      </View>

      
      <AppTextInput placeholder="Input Temperature" icon="thermometer"/>


    </View>
  );
}

const { StatusBarManager } = NativeModules;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    //paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
  },
  locationWrapper: {
    paddingTop: 25,
    paddingBottom: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  picker: {
    height: 10,
    width: 600,
    marginTop: -75,
  },
  mapmarkerContainer: {
    position: "absolute",
    right: "62%",
    top: "2%"
  },
  usualtempWrapper: {
    paddingTop: 50,
    paddingBottom: 20,
  },
  desiredtempWrapper: {
    paddingTop: 50,
    paddingBottom: 20,
  }

});

export default AddHouseScreen;
