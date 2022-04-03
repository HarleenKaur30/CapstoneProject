import React, { useEffect, useState } from "react";
import { Alert, Image, FlatList, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import ListHouse from "../components/ListHouse";
import ListItemSeperator from "../components/ListItemSeperator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemEditAction from "../components/ListItemEditAction";
import colors from "../config/colors";
import values from "../config/values";
import ip from "../config/ip";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

function HousesScreen({ numHouses, houses, route }) {
  const [newHouses, setNewHouses] = useState(houses);
  useEffect(() => {
    setNewHouses(houses);
  }, [houses]);
  const navigation = useNavigation();
  const handleDelete = (message) => {
    setNewHouses(newHouses.filter((m) => m.houseID !== message.houseID));
    houseID = message.houseID;
    DeleteRecord(houseID);
  };
  var houseID;

  var SearchBlindsInHouse = () => {
    var SearchAPIURL =
      "http://" + ip.ip + ":" + ip.port + "/api/search_blindsInHouse.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var data = {
      FindHouseID: houseID,
    };

    fetch(SearchAPIURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        var numBlinds = Number(response[0].numBlinds.toString());
        var houseName = response[1].houseName.toString();
        response.shift();
        response.shift();
        navigation.navigate("Blinds", {
          houseID: houseID,
          houseName: houseName,
          numBlindsOnSchedule: numBlinds,
          activeBlinds: response,
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
      "http://" + ip.ip + ":" + ip.port + "/api/delete_house.php";

    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var data = {
      houseID: houseID,
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
        Alert.alert("House Could Not Be Deleted", "Error Insert: " + error, [
          { text: "Ok" },
        ]);
      });
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
          <Text style={styles.weatherTextDate}>March 2nd, 2022</Text>
          <Text style={styles.weatherTextTemperature}>Sunny 8° C</Text>
          <Text style={styles.weatherTextSunriseSunset}>
            Sunrise: 6:34 A.M. {"\n"}Sunset: 10:23 P.M.
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={newHouses}
          keyExtractor={(message) => message.houseID.toString()}
          renderItem={({ item, index }) => (
            <ListHouse
              houseName={item.houseName}
              numberBlinds={item.numBlinds}
              onPress={() => {
                houseID = item.houseID;
                SearchBlindsInHouse(houseID);
              }}
              onLongPress={() =>
                Alert.alert(
                  "House Menu",
                  "What would you like to do with this house?",
                  [
                    { text: "Cancel" },
                    /*{
                      text: "Edit",
                      onPress: () =>
                        navigation.navigate("Add House", {
                          house: item.houseID,
                        }),
                    },*/
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
              /*renderLeftActions={() => (
                <ListItemEditAction
                  onPress={() =>
                    navigation.navigate("Add House", { house: item.title })
                  }
                />
              )}*/
            />
          )}
          ItemSeparatorComponent={ListItemSeperator}
          ListFooterComponent={
            <View style={styles.buttonContainer}>
              <Button
                title="Add House"
                onPress={() => {
                  values.maxNumberOfHouses === numHouses
                    ? Alert.alert(
                        "House Could Not Be Added",
                        "The maximum number of houses have already been added using this account.",
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
  weatherTextSunriseSunset: {
    color: colors.black,
    fontSize: 15.5,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    //fontWeight: "bold",
  },
});

export default HousesScreen;
