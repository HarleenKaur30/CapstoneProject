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
import ListBlind from "../components/ListBlind";
import ListItemSeperator from "../components/ListItemSeperator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemEditAction from "../components/ListItemEditAction";
import colors from "../config/colors";
import houses from "../config/houses";
import values from "../config/values";
import { useNavigation } from "@react-navigation/native";

function BlindsScreen({ route }) {
  const [newBlinds, setNewBlinds] = useState(houses);

  const navigation = useNavigation();
  const { houseId } = route.params;

  const handleDelete = (message) => {
    setNewBlinds(newBlinds.filter((m) => m.id !== message.id));
  };

  return (
    <View style={styles.largeContainer}>
      <View style={styles.container}>
        <FlatList
          data={newBlinds[houseId].blinds}
          renderItem={({ item }) => (
            <ListBlind
              blindName={item.name}
              openPercentage={item.openPercentage}
              blindGroup={item.group}
<<<<<<< Updated upstream
              onPress={() => navigation.navigate("Find Blinds")}
=======
              onPress={() =>
                navigation.navigate("View Blinds", {
                  blinds: item,
                  houseId: houseId,
                  houseName: route.params.houseName,
                })
              }
>>>>>>> Stashed changes
              onLongPress={() =>
                Alert.alert(
                  "Blind Menu",
                  "What would you like to do with this blind?",
                  [
                    { text: "Cancel" },
                    {
                      text: "Edit",
                      onPress: () =>
                        navigation.navigate("Edit Blinds Information", {
                          blinds: item,
                          house: houseId,
                        }),
                    },
                    {
                      text: "Delete",
                      onPress: () =>
                        Alert.alert(
                          "Delete",
                          "Are you sure you would like to delete this blind?",
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
                      "Are you sure you would like to delete this blind?",
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
                  onPress={() =>
                    navigation.navigate("Edit Blinds Information", {
                      blinds: item,
                      house: houseId,
                    })
                  }
                />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeperator}
          ListFooterComponent={
            <View style={styles.buttonContainer}>
              <Button
                title="Add Blind"
                onPress={() => {
                  values.maxNumberOfBlinds === newBlinds[houseId].numberBlinds
                    ? Alert.alert(
                        "Blind Could Not Be Added",
                        "The maximum number of blinds have already been added using this house.",
                        [{ text: "Ok" }]
                      )
                    : navigation.navigate("Find Blinds");
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

export default BlindsScreen;
