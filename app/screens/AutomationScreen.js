import React, { useState } from "react";
import {
  Text,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import colors from "../config/colors";
import ip from "../config/ip";
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
  var SearchRecord = () => {
    var SearchAPIURL =
      "http://" + ip.ip + ":" + ip.port + "/api/search_existing_houses.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var data = {
      FindUserID: global.userID,
    };

    fetch(SearchAPIURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (Number(response[0].numHouses.toString()) === 0) {
          Alert.alert(
            "Blinds Could Not Be Added",
            "Please add a house first.",
            [
              { text: "Cancel" },
              {
                text: "Add House",
                onPress: () => navigation.navigate("Add House"),
              },
            ]
          );
        } else {
          response.shift();
          navigation.navigate("Optimized House", { houses: response });
        }
      })
      .catch((error) => {
        Alert.alert("App Screen Could Not Be Loaded", "Error" + error, [
          { text: "Ok" },
        ]);
      });
  };
  <View>
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
  </View>;

  return (
    <View style={styles.container}>
      <View style={styles.scrollView} nestedScrollEnabled={true}>
        {/* View Optimized Schedule button */}
        <View style={styles.textContainer}>
          <Text style={styles.buttonText}>View Optimized Schedule</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => SearchRecord()}
          >
            <AntDesign name="areachart" size={100} color={colors.logo_blue} />
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
              size={100}
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
              navigation.navigate("Schedule Display", { data: "" });
              global.addScheduleName = null;
            }}
          >
            <Ionicons
              name="create-outline"
              size={100}
              color={colors.logo_blue}
            />
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
    marginVertical: "1.5%",
  },
  buttonText: {
    color: colors.black,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
  button: {
    height: 140,
    width: 140,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
    padding: "5%",
    top: "5%",
    backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: colors.logo_blue,
  },
});

export default AutomationScreen;
