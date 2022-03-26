import React, { useState } from "react";
import {
  Text,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  Pressable,
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
  const [scheduleNameModalVisible, setScheduleNameModalVisible] =
    useState(false);
  const [newScheduleName, setNewScheduleName] = useState("");
  var temp;
  /*const [items, setItems] = useState([
    { label: "House 1", value: "House 1" },
    { label: "House 2", value: "House 2" },
    { label: "House 3", value: "House 3" },
    { label: "House 4", value: "House 4" }, //need to dynamically change labels and values based on houses associated with a user
  ]);*/
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

  const SearchScheduleParts = () => {
    var SearchAPIURL =
      "http://" + ip.ip + ":" + ip.port + "/api/search_scheduleAddDisplay.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var data = {
      FindScheduleName: newScheduleName,
      FindUserID: global.userID,
    };

    fetch(SearchAPIURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        for (let i = 0; i < response.length; i++) {
          response[i].icon = (
            <MaterialCommunityIcons
              name={response[i].icon}
              size={30}
              color={colors.black}
            />
          );
        }
        navigation.navigate("Schedule Display", {
          data: response,
          scheduleName: newScheduleName,
        });
      })
      .catch((error) => {
        Alert.alert("Next Screen Could Not Be Loaded", "Error" + error, [
          { text: "Ok" },
        ]);
      });
  };

  var SearchSchedules = () => {
    var SearchAPIURL =
      "http://" + ip.ip + ":" + ip.port + "/api/scheduleFetch.php";
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
        var numSchedules = Number(response[0].numSchedules.toString());
        response.shift();
        navigation.navigate("Schedule", {
          screen: "Schedule",
          params: {
            schedules: response,
            numSchedules: numSchedules,
          },
        });
      })
      .catch((error) => {
        Alert.alert("App Could Not be Loaded", "Error" + error, [
          { text: "Ok" },
        ]);
      });
  };

  return (
    <View style={styles.container}>
      {/*<View>
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
    </View>*/}
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
              SearchSchedules();
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
            onPress={() => setScheduleNameModalVisible(true)}
          >
            <Ionicons
              name="create-outline"
              size={100}
              color={colors.logo_blue}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={scheduleNameModalVisible}
        onRequestClose={() => {
          setScheduleNameModalVisible(!scheduleNameModalVisible);
        }}
      >
        <View style={styles.popupParentContainer}>
          <View style={styles.popupContainer}>
            <View style={styles.instructionContainer}>
              <Text style={styles.textStyle}>Schedule Name</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Schedule Name"
              onChangeText={(text) => setNewScheduleName(text)}
            />

            <Pressable
              style={styles.OKButton}
              onPress={() => {
                setNewScheduleName(newScheduleName);
                newScheduleName.length > 0
                  ? setScheduleNameModalVisible(!scheduleNameModalVisible)
                  : (temp = 0);
                newScheduleName.length > 0
                  ? SearchScheduleParts(newScheduleName)
                  : Alert.alert(
                      "Schedule Name",
                      "Please enter a name for the schedule to continue.",
                      [{ text: "Ok" }]
                    );
              }}
            >
              <Text style={styles.controlButtonText}>OK</Text>
            </Pressable>
            <Pressable
              style={styles.cancelButton}
              onPress={() =>
                setScheduleNameModalVisible(!scheduleNameModalVisible)
              }
            >
              <Text style={styles.controlButtonText}>CANCEL</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  popupParentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    width: "90%",
    height: 150,
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  OKButton: {
    backgroundColor: colors.white,
    position: "absolute",
    bottom: "10%",
    right: "15%",
  },
  cancelButton: {
    backgroundColor: colors.white,
    position: "absolute",
    bottom: "10%",
    right: "35%",
  },
  controlButtonText: {
    color: "blue",
    fontSize: 15,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "normal",
  },
  input: {
    height: "30%",
    width: "90%",
    borderWidth: 1,
    borderColor: colors.black,
    position: "absolute",
    top: "30%",
    right: "5%",
  },
  instructionContainer: {
    height: "15%",
    width: "90%",
    position: "absolute",
    top: "10%",
    right: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: colors.black,
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
});

export default AutomationScreen;
