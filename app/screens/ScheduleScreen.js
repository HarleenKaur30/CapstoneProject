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
import { useNavigation } from "@react-navigation/native";

function ScheduleScreen({}) {
  const [newSchedules, setNewSchedules] = useState(schedules);

  const navigation = useNavigation();

  const handleDelete = (message) => {
    setNewSchedules(newSchedules.filter((m) => m.id !== message.id));
  };

  return (
    <View style={styles.largeContainer}>
      <View style={styles.container}>
        <FlatList
          data={newSchedules}
          renderItem={({ item, index }) => (
            <ListSchedule
              scheduleName={item.title}
              onPress={() =>
                navigation.navigate("Blinds Active On Schedule", {
                  scheduleId: index,
                })
              }
              onLongPress={() =>
                Alert.alert(
                  "Schedule Menu",
                  "What would you like to do with this schedule?",
                  [
                    { text: "Cancel" },
                    {
                      text: "Edit",
                      onPress: () => navigation.navigate("Schedule Display"),
                    },
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
              renderLeftActions={() => (
                <ListItemEditAction
                  onPress={() => navigation.navigate("Schedule Display")}
                />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeperator}
          ListFooterComponent={
            <View style={styles.buttonContainer}>
              <Button
                title="Add Schedule"
                onPress={() => {
                  values.maxNumberOfSchedules === values.houses.schedules
                    ? Alert.alert(
                        "Schdeule Could Not Be Added",
                        "The maximum number of schedules have already been added using this device.",
                        [{ text: "Ok" }]
                      )
                    : navigation.navigate("Schedule Display");
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
    backgroundColor: colors.orange,
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
