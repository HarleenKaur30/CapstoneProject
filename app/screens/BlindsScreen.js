import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { HeaderBackButton } from "react-navigation-stack";
import ListBlind from "../components/ListBlind";
import ListItemSeperator from "../components/ListItemSeperator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemEditAction from "../components/ListItemEditAction";
import colors from "../config/colors";
import ip from "../config/ip";
import values from "../config/values";
import { useNavigation } from "@react-navigation/native";

function BlindsScreen({ route }) {
  var [newBlinds, setNewBlinds] = useState(route.params.activeBlinds);
  const navigation = useNavigation();
  const houseID = route.params.houseID;
  var unitID;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderBackButton onPress={() => SearchHouses()} />,
    }),
      [navigation];
  });

  const handleDelete = (message, houseID) => {
    setNewBlinds(newBlinds.filter((m) => m.unitID !== message.unitID));
    unitID = message.unitID;
    DeleteRecord(unitID, houseID);
  };

  var SearchHouses = () => {
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
        var numHouses = Number(response[0].numHouses.toString());
        response.shift();
        navigation.navigate("Home", {
          screen: "Home",
          params: { houses: response, numHouses: numHouses },
        });
      })
      .catch((error) => {
        Alert.alert("App Could Not be Loaded", "Error" + error, [
          { text: "Ok" },
        ]);
      });
  };

  var DeleteRecord = () => {
    var InsertAPIURL =
      "http://" + ip.ip + ":" + ip.port + "/api/delete_blind.php";

    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var data = {
      unitID: unitID,
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
        Alert.alert("Blinds Could Not Be Deleted", "Error Insert: " + error, [
          { text: "Ok" },
        ]);
      });
  };

  if (route.params.numBlindsOnSchedule > 0) {
    //useEffect(() => {
    //  setNewBlinds(route.params.activeBlinds);
    //});

    return (
      <View style={styles.largeContainer}>
        <View style={styles.container}>
          <FlatList
            data={newBlinds}
            keyExtractor={(message) => message.unitID.toString()}
            renderItem={({ item, index }) => (
              <ListBlind
                blindName={item.blindsName}
                openPercentage={item.openPercentage}
                blindGroup={item.groupName}
                onPress={() =>
                  navigation.navigate("View Blinds", {
                    blinds: item,
                    houseID: houseID,
                    houseName: route.params.houseName,
                  })
                }
                onLongPress={() =>
                  Alert.alert(
                    "Blind Menu",
                    "What would you like to do with this blind?",
                    [
                      { text: "Cancel" },
                      /*{
                        text: "Edit",
                        onPress: () =>
                          navigation.navigate("Edit Blinds Information", {
                            blinds: item,
                            house: houseId,
                          }),
                      },*/
                      {
                        text: "Delete",
                        onPress: () =>
                          Alert.alert(
                            "Delete",
                            "Are you sure you would like to delete this blind?",
                            [
                              { text: "Cancel" },
                              {
                                text: "Yes",
                                onPress: () => handleDelete(item, houseID),
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
                /*renderLeftActions={() => (
                  <ListItemEditAction
                    onPress={() =>
                      navigation.navigate("Edit Blinds Information", {
                        blinds: item,
                        house: houseId,
                      })
                    }
                  />
                )}*/
              />
            )}
            ItemSeparatorComponent={ListItemSeperator}
            ListFooterComponent={
              <View style={styles.buttonContainer}>
                <Button
                  title="Add Blind"
                  onPress={() => {
                    values.maxNumberOfBlinds ===
                    route.params.numBlindsOnSchedule
                      ? Alert.alert(
                          "Blind Could Not Be Added",
                          "The maximum number of blinds have already been added using this house.",
                          [{ text: "Ok" }]
                        )
                      : navigation.navigate("Find Blinds", {
                          houseID: houseID,
                        });
                  }}
                />
              </View>
            }
          />
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={[
          styles.largeContainer,
          {
            justifyContent: "center",
          },
        ]}
      >
        <View style={styles.icon}>
          <Text style={styles.buttonText}>Add Blinds</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Find Blinds", { houseID: houseID });
            }}
          >
            <MaterialIcons
              name="library-add"
              size={100}
              color={colors.logo_blue}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 150,
    width: 150,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
    padding: "5%",
    top: "5%",
    backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: colors.orange,
  },
  buttonContainer: {
    backgroundColor: colors.logo_blue,
    borderRadius: 25,
    width: "40%",
    marginHorizontal: "30%",
    marginVertical: "5%",
  },
  buttonText: {
    color: colors.black,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
  container: {
    backgroundColor: colors.white,
  },
  icon: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  largeContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

export default BlindsScreen;
