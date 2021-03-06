import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import VerticalSlider from "rn-vertical-slider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HeaderBackButton } from "react-navigation-stack";

import colors from "../config/colors";
import ip from "../config/ip";

function ShowBlindsScreen({ navigation, route }) {
  const [newOpenPercentage, setNewOpenPercentage] = useState();
  const battery = route.params.blinds.battery;
  const unitID = route.params.blinds.unitID;
  const houseID = route.params.houseID;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton onPress={() => SearchBlindsInHouse(houseID)} />
      ),
    }),
      [navigation];
  });

  var SearchSchedules = () => {
    var SearchAPIURL =
      "http://" + ip.ip + ":" + ip.port + "/api/scheduleFetch.php";
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
        var numSchedules = Number(response[0].numSchedules.toString());
        response.shift();
        navigation.navigate("Schedule", {
          screen: "Schedule",
          params: {
            schedules: response,
            numSchedules: numSchedules,
          },
        });
      })
      .catch((error) => {
        Alert.alert("App Could Not be Loaded", "Error" + error, [
          { text: "Ok" },
        ]);
      });
  };

  var UpdateOpenPercentage = () => {
    var SearchAPIURL =
      "http://" + ip.ip + ":" + ip.port + "/api/update_openPercentage.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var data = {
      unitID: unitID,
      openPercentage: newOpenPercentage,
    };

    fetch(SearchAPIURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response[0].Message);
      })
      .catch((error) => {
        console.log("App Could Not be Loaded", "Error" + error);
      });
  };

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

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>
            {route.params.houseName}: {route.params.blinds.blindsName}
          </Text>
          <MaterialCommunityIcons
            name={
              (battery / 10).toFixed(0) > 0 && (battery / 10).toFixed(0) < 10
                ? "battery-" + "" + (battery / 10).toFixed(0) * 10
                : (battery / 10).toFixed(0) == 10
                ? "battery"
                : (battery / 10).toFixed(0) == 0
                ? "battery-alert-variant-outline"
                : "battery-unknown"
            }
            color={
              (battery / 10).toFixed(0) <= 1 && (battery / 10).toFixed(0) >= 0
                ? colors.danger
                : colors.dark
            }
            size={30}
          />
        </View>
        <View style={styles.blindHeader} />
        <View style={styles.blindContainer}>
          <ImageBackground
            source={require("../assets/window.jpg")}
            style={styles.blindImage}
          >
            <View
              style={{
                width: "100%",
                height:
                  newOpenPercentage == undefined
                    ? "" +
                      100 -
                      Number(route.params.blinds.openPercentage) +
                      "%"
                    : "" + 100 - newOpenPercentage + "%",
                backgroundColor: "#E2DCCD",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                borderColor: colors.dark,
                borderWidth: 3,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Text style={styles.sliderPullText}>Pull</Text>
              <View style={styles.blindButton} />
            </View>
            <View
              style={{ width: "100%", height: "100%", position: "absolute" }}
            >
              <VerticalSlider
                value={
                  newOpenPercentage == undefined
                    ? Number(route.params.blinds.openPercentage)
                    : newOpenPercentage
                }
                disabled={false}
                min={0}
                max={100}
                onChange={(numberValue) => {
                  setNewOpenPercentage(numberValue);
                  UpdateOpenPercentage(unitID, newOpenPercentage);
                }}
                width="100%"
                height={325}
                step={1}
                minimumTrackTintColor="transparent"
                maximumTrackTintColor={"transparent"}
              />
            </View>
          </ImageBackground>
        </View>
        <Text style={styles.sliderText}>
          {newOpenPercentage == undefined
            ? Number(route.params.blinds.openPercentage)
            : newOpenPercentage}
          % Open
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => SearchSchedules()}
          // button to change schedules, this path will likely need to be changed
        >
          <Text style={styles.buttonText}>
            Current Schedule:{"\n"}
            {route.params.blinds.scheduleName}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() =>
            navigation.navigate("Optimized Schedule", {
              houseID: houseID,
            })
          }
        >
          <Text style={styles.buttonText}>See Optimized Schedule</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  blindButton: {
    backgroundColor: colors.medium,
    marginBottom: "5%",
    width: "15%",
    height: 10,
    borderRadius: 20,
  },
  blindContainer: {
    width: "80%",
    height: 325,
    borderColor: colors.dark,
    borderTopWidth: 0,
    borderWidth: 3,
    backgroundColor: colors.white,
  },
  blindImage: {
    width: "100%",
    height: 323,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  blindHeader: {
    width: "85%",
    height: "5%",
    backgroundColor: colors.dark,
    marginTop: "3%",
  },
  button: {
    backgroundColor: colors.logo_blue,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "3.5%",
    width: "90%",
    marginVertical: "2.5%",
    marginHorizontal: "5%",
  },
  button2: {
    backgroundColor: colors.orange,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "3.5%",
    width: "90%",
    marginVertical: "2.5%",
    marginHorizontal: "5%",
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: "center",
    padding: "5%",
  },
  sliderPullText: {
    color: colors.medium,
    fontSize: 12,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: "1%",
  },
  sliderText: {
    color: colors.medium,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: "4%",
    paddingTop: "3%",
  },
  text: {
    color: colors.black,
    fontSize: 20,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
    marginRight: "5%",
  },
});

export default ShowBlindsScreen;
