import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import VerticalSlider from "rn-vertical-slider";

import colors from "../config/colors";

function ShowBlindsScreen({ navigation, route }) {
  const [newOpenPercentage, setNewOpenPercentage] = useState();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {route.params.houseName}: {route.params.blinds.name}
      </Text>
      <View style={styles.blindHeader} />
      <View style={styles.blindContainer}>
        <ImageBackground
          source={require("../assets/window.jpg")}
          style={styles.blindImage}
        >
          <View
            style={{
              width: "100%",
              height: isNaN(newOpenPercentage)
                ? "" + 100 - route.params.blinds.openPercentage + "%"
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
          <View style={{ width: "100%", height: "100%", position: "absolute" }}>
            <VerticalSlider
              value={
                isNaN(newOpenPercentage)
                  ? route.params.blinds.openPercentage
                  : newOpenPercentage
              }
              disabled={false}
              min={0}
              max={100}
              onChange={(numberValue) => setNewOpenPercentage(numberValue)}
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
        {isNaN(newOpenPercentage)
          ? route.params.blinds.openPercentage
          : newOpenPercentage}
        % Open
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Schedules")}
        // button to change schedules, this path will likely need to be changed
      >
        <Text style={styles.buttonText}>
          Current Schedule:{"\n"}
          {route.params.blinds.schedule}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Optimized Schedule")}
      >
        <Text style={styles.buttonText}>See Optimized Schedule</Text>
      </TouchableOpacity>
    </View>
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
    backgroundColor: colors.medium,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "3.5%",
    width: "90%",
    marginTop: "5%",
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
  slider: {
    width: "100%",
    height: "10%",
    //position: "absolute",
    //top:
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
  },
});

export default ShowBlindsScreen;
