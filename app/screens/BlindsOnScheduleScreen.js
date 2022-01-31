import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import ListBlindSchedule from "../components/ListBlindSchedule";
import ListItemSeperator from "../components/ListItemSeperator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import colors from "../config/colors";
import schedules from "../config/schedules";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import AppButton from "../components/AppButton";
import { Colors } from "react-native/Libraries/NewAppScreen";

function BlindsOnScheduleScreen({ route }) {
  const [newSchedulesBlinds, setNewScheduleBlinds] = useState(schedules);

  const navigation = useNavigation();
  const { scheduleId } = route.params;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "House 1 - Bedroom1", value: "Bedroom2" },
    { label: "Vacation House - Hallway3", value: "Hallway3" },
    { label: "Office - Kitchen", value: "Kitchen" },
    { label: "House 2 - Outside", value: "Outside" }, //need to dynamically change labels and values
  ]);

  const handleDelete = (message) => {
    setNewScheduleBlinds(newSchedulesBlinds.filter((m) => m.id !== message.id));
  };

  return (
    <View style={styles.largeContainer}>
      <View style={styles.container}>
        <FlatList
          data={newSchedulesBlinds[scheduleId].blinds}
          renderItem={({ item }) => (
            <ListBlindSchedule
              blindName={item.name}
              blindGroup={item.group}
              //houseName = {} THIS NEEDS TO BE TAKEN CARE OF AT SOME POINT
              onLongPress={() =>
                Alert.alert(
                  "Blind Menu",
                  "What would you like to do with this blind?",
                  [
                    { text: "Cancel" },

                    {
                      text: "Remove",
                      onPress: () =>
                        Alert.alert(
                          "Remove",
                          "Are you sure you would like to remove this blind from the schedule?",
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
                      "Remove",
                      "Are you sure you would like to remove this blind from the schedule?",
                      [
                        { text: "Cancel" },
                        { text: "Yes", onPress: () => handleDelete(item) },
                      ]
                    )
                  }
                />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeperator}
        />
      </View>

      <View style={styles.pickerContainer}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Add a blind/group to schedule"
          showTickIcon={true}
          closeAfterSelecting={true}
          listMode="SCROLLVIEW"
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}
          containerStyle={{
            width: "70%",
            marginBottom: "4%",
          }}
        />
        <AppButton title="Finish Adding" onPress={() => console.log()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    flex: 0.25,
    backgroundColor: colors.white,
    padding: "2%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: colors.white,
    flex: 0.8,
  },
  largeContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
  button: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BlindsOnScheduleScreen;
