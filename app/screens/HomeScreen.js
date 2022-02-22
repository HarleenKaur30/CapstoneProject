import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import colors from "../../app/config/colors";
import values from "../../app/config/values";
import { MaterialIcons } from "@expo/vector-icons";
import HousesScreen from "./HousesScreen";
import * as Animatable from "react-native-animatable";

function HomeScreen({ navigation }) {
  const [houseCount, setHouseCount] = useState(values.houses.number);

  if (!houseCount) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            flexDirection: "column",
          },
        ]}
      >
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
            <Text style={styles.weatherTextSunriseSunset}>
              Sunrise: 8:34 A.M. {"\n"}Sunset: 10:23 P.M.
            </Text>
          </View>
        </View>

        <View style={styles.icon}>
          <Text style={styles.buttonText}>Click to add device!</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Add Device");
            }}
          >
            <MaterialIcons
              name="library-add"
              size={100}
              color={colors.orange}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else {
    return <HousesScreen />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  weatherContainer: {
    flex: 1,
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

  icon: {
    flex: 4,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  weatherTextDate: {
    color: colors.dimgray,
    fontSize: 15.5,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
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
  },

  buttonText: {
    color: colors.black,
    fontSize: 22,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },

  textContainer: {
    flex: 0.8,
    height: 200,
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.white,
    borderBottomColor: colors.light,
    marginTop: "3%",
    position: "absolute",
  },

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
    borderColor: colors.secondary,
  },
});

export default HomeScreen;
