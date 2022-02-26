import React, { useState } from "react";
import {
  Text,
  View,
  NativeModules,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import DropDownPicker from "react-native-dropdown-picker";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";

function AddHouseScreen(props) {
  const [nickname, setNickname] = useState();
  const [usualtemp, setUsualtemp] = useState();
  const [desiredtemp, setDesiredtemp] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Edmonton", value: "Edmonton" },
    { label: "Calgary", value: "Calgary" },
    { label: "Toronto", value: "Toronto" },
    { label: "Vancouver", value: "Vancouver" },
  ]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.locationWrapper}>
          <Text style={styles.sectionTitle}>Location</Text>
        </View>

        <MaterialCommunityIcons
          name="map-marker"
          size={40}
          style={styles.mapmarkerContainer}
          color={colors.logo_blue}
        />

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />

        <View style={styles.nicknameWrapper}>
          <Text style={styles.sectionTitle}>House Nickname</Text>
        </View>

        <AppTextInput
          autoCapitalize="words"
          autoCorrect={false}
          icon="home"
          keyboardType="default"
          onChangeText={(text) => setNickname(text)}
          placeholder="Input House Nickname"
        />

        <View style={styles.usualtempWrapper}>
          <Text style={styles.sectionTitle}>Usual Temperature</Text>
        </View>

        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="thermometer"
          keyboardType="numeric"
          onChangeText={(text) => setUsualtemp(text)}
          placeholder="Input Temperature (degrees Celsius)"
        />

        <View style={styles.desiredtempWrapper}>
          <Text style={styles.sectionTitle}>Desired Temperature</Text>
        </View>

        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="thermometer"
          keyboardType="numeric"
          onChangeText={(text) => setDesiredtemp(text)}
          placeholder="Input Temperature (degrees Celsius)"
        />

        <View style={styles.button}>
          <AppButton title="Submit" onPress={() => console.log()} />
        </View>
      </View>
    </ScrollView>
  );
}

const { StatusBarManager } = NativeModules;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    padding: "5%",
    //paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
  },
  locationWrapper: {
    paddingTop: 25,
    paddingBottom: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  picker: {
    height: 10,
    width: 600,
    marginTop: -75,
  },
  mapmarkerContainer: {
    position: "absolute",
    right: "70%",
    top: "4.5%",
  },
  nicknameWrapper: {
    paddingTop: 25,
    paddingBottom: 20,
  },
  usualtempWrapper: {
    paddingTop: 25,
    paddingBottom: 20,
  },
  desiredtempWrapper: {
    paddingTop: 25,
    paddingBottom: 20,
  },
  button: {
    paddingTop: 35,
    alignItems: "center",
    width: 600,
  },
});

export default AddHouseScreen;
