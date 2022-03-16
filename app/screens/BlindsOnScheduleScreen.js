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
import ip from "../config/ip";
import schedules from "../config/schedules";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import AppButton from "../components/AppButton";
import { Colors } from "react-native/Libraries/NewAppScreen";

function BlindsOnScheduleScreen({ route }) {
  const [newSchedulesBlinds, setNewScheduleBlinds] = useState(
    route.params.activeBlinds
  );

  const navigation = useNavigation();
  const scheduleID = route.params.scheduleID;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [unitID, setUnitID] = useState(0);
  const [items, setItems] = useState(route.params.allBlinds);

  ChangeRecord = () => {
    if (unitID > 0) {
      var SearchAPIURL =
        "http://" + ip.ip + ":" + ip.port + "/api/blind_schedule_change.php";
      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      var data = {
        unitID: unitID,
        scheduleID: scheduleID,
      };

      fetch(SearchAPIURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          Alert.alert("Blind Added To Schedule", response[0].Message, [
            { text: "Ok" },
          ]);
        })
        .catch((error) => {
          Alert.alert(
            "Blind Could Not Be Added To Schedule",
            "Error: " + error,
            [{ text: "Ok" }]
          );
        });
    } else {
      Alert.alert("Error", "Please choose a blind.", [{ text: "Ok" }]);
    }
  };

  const handleDelete = (message) => {
    setNewScheduleBlinds(
      newSchedulesBlinds.filter((m) => m.unitID !== message.unitID)
    );
  };
  if (route.params.numBlindsOnSchedule > 0) {
    return (
      <View style={styles.largeContainer}>
        <View style={styles.container}>
          <FlatList
            data={newSchedulesBlinds}
            keyExtractor={(message) => message.unitID.toString()}
            renderItem={({ item, index }) => (
              <ListBlindSchedule
                blindName={item.blindsName}
                blindGroup={item.groupName}
                houseName={item.houseName}
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
                              {
                                text: "Yes",
                                onPress: () => handleDelete(item),
                              },
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
            onSelectItem={(item) => setUnitID(Number(item.value))}
          />
          <AppButton
            title="Finish Adding"
            onPress={() => {
              ChangeRecord(unitID, scheduleID);
            }}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.largeContainer}>
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
            onSelectItem={(item) => setUnitID(Number(item.value))}
          />
          <AppButton
            title="Finish Adding"
            onPress={() => {
              ChangeRecord(unitID, scheduleID);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pickerContainer: {
    flex: 0.25,
    //backgroundColor: colors.white,
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
