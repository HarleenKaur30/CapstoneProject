import React, { useState } from "react";
import { StyleSheet, FlatList, View, Alert } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import ListSchedule from "../components/ListSchedule";
import ListItemSeperator from "../components/ListItemSeperator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemEditAction from "../components/ListItemEditAction";
import colors from "../config/colors";
import schedules from "../config/schedules";
import values from "../config/values";
import ip from "../config/ip";
import { useNavigation } from "@react-navigation/native";

function ScheduleScreen({}) {
  const [newSchedules, setNewSchedules] = useState(schedules);

  const navigation = useNavigation();
  var scheduleID;

  const handleDelete = (message) => {
    setNewSchedules(newSchedules.filter((m) => m.id !== message.id));
  };

  SearchBlindsOnSchedule = () => {
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

  return (
    <View style={styles.largeContainer}>
      <View style={styles.container}>
        <FlatList
          data={newSchedules}
          renderItem={({ item, index }) => (
            <ListSchedule
              scheduleName={item.title}
              onPress={() => {
                scheduleID = item.id; //please ensure schedule ID is sent here instead
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
                title="Add Schedule"
                onPress={() => {
                  /*values.maxNumberOfSchedules === values.houses.schedules
                    ? Alert.alert(
                        "Schdeule Could Not Be Added",
                        "The maximum number of schedules have already been added using this device.",
                        [{ text: "Ok" }]
                      )
                    :*/ navigation.navigate("Schedule Display", { data: "" });
                }}
              />
            </View>
          }
        />
      </View>
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
});

export default ScheduleScreen;
