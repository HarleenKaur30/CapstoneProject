import React, { useState } from "react";
import {
  Text,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import colors from "../config/colors";
import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

function AutomationScreen({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "House 1", value: "House 1" },
    { label: "House 2", value: "House 2" },
    { label: "House 3", value: "House 3" },
    { label: "House 4", value: "House 4" }, //need to dynamically change labels and values based on houses associated with a user
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select a house"
        showTickIcon={true}
        closeAfterSelecting={true}
        listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
        containerStyle={{
          width: "70%",
          marginBottom: "2%",
          marginTop: "2%",
          elevation: 1,
          zIndex: 1,
        }}
      />

      <View style={styles.scrollView} nestedScrollEnabled={true}>
        {/* View Optimized Schedule button */}
        <View style={styles.textContainer}>
          <Text style={styles.buttonText}>View Optimized Schedule</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Optimized Schedule");
            }}
          >
            <AntDesign name="areachart" size={90} color={colors.logo_blue} />
          </TouchableOpacity>
        </View>

        {/* View All Schedule button */}
        <View style={styles.textContainer}>
          <Text style={styles.buttonText}>View All Schedules</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Schedule");
            }}
          >
            <MaterialCommunityIcons
              name="timetable"
              size={90}
              color={colors.logo_blue}
            />
          </TouchableOpacity>
        </View>

        {/* Create Schedule button */}
        <View style={styles.textContainer}>
          <Text style={styles.buttonText}>Create New Schedule</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Schedule Display");
            }}
          >
            <Ionicons name="create-outline" size={90} color={colors.logo_blue} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colors.white,
    padding: "2%",
    //justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    backgroundColor: colors.white,
    marginHorizontal: 0,
    width: "100%",
  },
  textContainer: {
    height: "31.7%",
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.white,
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    position: "relative",
  },
  buttonText: {
    color: colors.black,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
  button: {
    height: 125,
    width: 125,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
    padding: "5%",
    top: "5%",
    backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: colors.orange,
  },
});

export default AutomationScreen;
