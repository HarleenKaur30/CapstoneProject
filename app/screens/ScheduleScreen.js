import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Alert,
  Modal,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import ListSchedule from "../components/ListSchedule";
import ListItemSeperator from "../components/ListItemSeperator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemEditAction from "../components/ListItemEditAction";
import colors from "../config/colors";
import schedules2 from "../config/schedules";
import values from "../config/values";
import ip from "../config/ip";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ScheduleScreen({ route }) {
  const [newSchedules, setNewSchedules] = useState(route.params.schedules);
  var schedules = route.params.schedules;
  useEffect(() => {
    setNewSchedules(schedules);
  }, [schedules]);
  const [scheduleNameModalVisible, setScheduleNameModalVisible] =
    useState(false);
  const [newScheduleName, setNewScheduleName] = useState("");

  const navigation = useNavigation();
  var scheduleID;
  var deleteScheduleID;

  const handleDelete = (message) => {
    setNewSchedules(
      newSchedules.filter((m) => m.scheduleID !== message.scheduleID)
    );
    deleteScheduleID = message.scheduleID;
    DeleteRecord(deleteScheduleID);
  };

  var SearchBlindsOnSchedule = () => {
    var SearchAPIURL =
      "http://" + ip.ip + ":" + ip.port + "/api/search_blindsOnSchedule.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var data = {
      FindScheduleID: scheduleID,
    };

    fetch(SearchAPIURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        var numBlinds = Number(response[0].numBlinds.toString());
        response.shift();
        var activeBlinds = response;

        //Following Code Finds All Blinds and then moves to next page;
        var SearchAPIURL =
          "http://" + ip.ip + ":" + ip.port + "/api/search_all_blinds.php";
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
            navigation.navigate("Blinds Active On Schedule", {
              scheduleID: scheduleID,
              numBlindsOnSchedule: numBlinds,
              activeBlinds: activeBlinds,
              allBlinds: response,
            });
          })
          .catch((error) => {
            Alert.alert("Next Screen Could Not Be Loaded", "Error" + error, [
              { text: "Ok" },
            ]);
          });
      })
      .catch((error) => {
        Alert.alert("Next Screen Could Not Be Loaded", "Error" + error, [
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

  var DeleteRecord = () => {
    var InsertAPIURL =
      "http://" + ip.ip + ":" + ip.port + "/api/delete_schedule.php";

    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var data = {
      scheduleID: deleteScheduleID,
    };

    fetch(InsertAPIURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response[0].Message);
      })
      .catch((error) => {
        Alert.alert("Schedule Could Not Be Deleted", "Error Insert: " + error, [
          { text: "Ok" },
        ]);
      });
  };

  console.log(newSchedules);

  return (
    <View style={styles.largeContainer}>
      <View style={styles.container}>
        <FlatList
          data={newSchedules}
          keyExtractor={(message) => message.scheduleID.toString()}
          renderItem={({ item, index }) => (
            <ListSchedule
              scheduleName={item.scheduleName}
              onPress={() => {
                scheduleID = item.scheduleID; //please ensure schedule ID is sent here instead
                //scheduleID=item.scheduleID;
                SearchBlindsOnSchedule(scheduleID);
              }}
              onLongPress={() =>
                Alert.alert(
                  "Schedule Menu",
                  "What would you like to do with this schedule?",
                  [
                    { text: "Cancel" },
                    /*{
                      text: "Edit",
                      onPress: () => navigation.navigate("Schedule Display"),
                    },*/
                    {
                      text: "Delete",
                      onPress: () =>
                        Alert.alert(
                          "Delete",
                          "Are you sure you would like to delete this schedule?",
                          [
                            { text: "Cancel" },
                            { text: "Yes", onPress: () => handleDelete(item) },
                          ]
                        ),
                    },
                  ]
                )
              }
              renderRightActions={() => (
                <ListItemDeleteAction
                  onPress={() =>
                    Alert.alert(
                      "Delete",
                      "Are you sure you would like to delete this schedule?",
                      [
                        { text: "Cancel" },
                        { text: "Yes", onPress: () => handleDelete(item) },
                      ]
                    )
                  }
                />
              )}
              /*renderLeftActions={() => (
                <ListItemEditAction
                  onPress={() => navigation.navigate("Schedule Display")}
                />
              )}*/
            />
          )}
          ItemSeparatorComponent={ListItemSeperator}
          ListFooterComponent={
            <View style={styles.buttonContainer}>
              <Button
                title="Add or Edit Schedule"
                onPress={() => setScheduleNameModalVisible(true)}
              />
            </View>
          }
        />
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
  buttonContainer: {
    backgroundColor: colors.logo_blue,
    borderRadius: 25,
    width: "40%",
    marginHorizontal: "30%",
    marginVertical: "5%",
  },
  container: {
    backgroundColor: colors.white,
  },
  largeContainer: {
    backgroundColor: colors.white,
    flex: 1,
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

export default ScheduleScreen;
