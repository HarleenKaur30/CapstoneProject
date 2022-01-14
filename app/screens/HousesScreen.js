import React, { useState } from "react";
import { StyleSheet, FlatList, View, Alert } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";

import ListHouse from "../components/ListHouse";
import ListItemSeperator from "../components/ListItemSeperator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemEditAction from "../components/ListItemEditAction";
import colors from "../config/colors";
import houses from "../config/houses";
import values from "../config/values";

function HousesScreen({ navigation }) {
  const [newHouses, setNewHouses] = useState(houses);

  const handleDelete = (message) => {
    setNewHouses(newHouses.filter((m) => m.id !== message.id));
  };

  return (
    <View style={styles.largeContainer}>
      <View style={styles.container}>
        <FlatList
          data={newHouses}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({ item }) => (
            <ListHouse
              houseName={item.name}
              numberBlinds={item.numberBlinds}
              onPress={() =>
                navigation.navigate("Blinds", { house: item.title })
              }
              onLongPress={() =>
                Alert.alert(
                  "House Menu",
                  "What would you like to do with this house?",
                  [
                    { text: "Cancel" },
                    {
                      text: "Edit",
                      onPress: () =>
                        navigation.navigate("Add House", { house: item.title }),
                    },
                    {
                      text: "Delete",
                      onPress: () =>
                        Alert.alert(
                          "Delete",
                          "Are you sure you would like to delete this house?",
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
                      "Are you sure you would like to delete this house?",
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
                    navigation.navigate("Add House", { house: item.title })
                  }
                />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeperator}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Add House"
            onPress={() => {
              values.maxNumberOfHouses === values.houses.number
                ? Alert.alert(
                    "House Could Not Be Added",
                    "The maximum number of houses have already been added using this device.",
                    [{ text: "Ok" }]
                  )
                : navigation.navigate("Add House");
            }}
          />
        </View>
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

export default HousesScreen;
