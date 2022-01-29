import React, { useState } from "react";
import { StyleSheet, FlatList, View, Alert, Image, Text } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import ListHouse from "../components/ListHouse";
import ListItemSeperator from "../components/ListItemSeperator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemEditAction from "../components/ListItemEditAction";
import colors from "../config/colors";
import houses from "../config/houses";
import values from "../config/values";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

function HousesScreen({}) {
  const [newHouses, setNewHouses] = useState(houses);
  const navigation = useNavigation();
  const handleDelete = (message) => {
    setNewHouses(newHouses.filter((m) => m.id !== message.id));
  };

  return (
    <View style={styles.largeContainer}>
      <View style={[styles.weatherContainer, { flexDirection: "row" }]}>
        <Animatable.View
          style={styles.weatherIconContainer}
          animation="pulse"
          iterationCount={15}
          direction="alternate"
        >
          <Image
            style={styles.weatherIconImageContainer}
            source={require("../assets/Sun.png")}
          />
        </Animatable.View>

        <View style={styles.weatherTextContainer}>
          <Text style={styles.weatherTextDate}>February 30th, 2050</Text>
          <Text style={styles.weatherTextTemperature}>Sunny 25° C</Text>
          <Text style={styles.weatherTextPeakTemperature}>
            Peak Temperature: 30°C {"\n"} Time of Peak Temperatue: 12:00pm
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={newHouses}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({ item, index }) => (
            <ListHouse
              houseName={item.name}
              numberBlinds={item.numberBlinds}
              onPress={() =>
                navigation.navigate("Blinds", {
                  houseId: index,
                  houseName: item.name,
                })
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
          ListFooterComponent={
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
  weatherContainer: {
    width: "100%",
    height: "20%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  weatherTextContainer: {
    flex: 2.2,
    backgroundColor: colors.light,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  weatherIconContainer: {
    flex: 1,
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
  },
  weatherIconImageContainer: {
    height: 80,
    width: 80,
  },
  weatherTextDate: {
    color: colors.dimgray,
    fontSize: 15.5,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    //fontWeight: "bold",
  },
  weatherTextTemperature: {
    color: colors.black,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
  weatherTextPeakTemperature: {
    color: colors.black,
    fontSize: 15.5,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    //fontWeight: "bold",
  },
});

export default HousesScreen;
