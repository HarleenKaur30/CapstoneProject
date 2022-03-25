// screen to be used when energy savings data is available. Includes additional info bar showing evergy savings and button
// to navigate to EnergySavingsScreen.
//To use this screen replace "import OptimizedScheduleScreen from "./app/screens/OptimizedScheduleScreen";" in App.js with "import OptimizedScheduleScreen from "./app/screens/OptimizedScheduleScreenWithEnergy";"

import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import colors from "../config/colors";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";
import Timeline from "react-native-timeline-flatlist";

const energySavings = 25.2; // need to import this value from backend energy savings calculation

export default class OptScheduleScreen extends Component {
  constructor(props) {
    super(props);
    this.data = [
      // import this from local buffer, filled from API at midnight each day
      {
        time: "3:00am",
        title: "Minimum Outdoor Temperature",
        icon: (
          <FontAwesome5
            name="thermometer-quarter"
            size={30}
            color={colors.black}
          />
        ),
      },
      {
        time: "9:00am",
        title: "Sunrise",
        icon: <Feather name="sunrise" size={30} color={colors.black} />,
      },
      {
        time: "10:45am",
        title: "Close Blinds",
        icon: (
          <MaterialCommunityIcons
            name="blinds"
            size={30}
            color={colors.black}
          />
        ),
      },
      {
        time: "12:00pm",
        title: "Peak Outdoor Temperature",
        icon: (
          <FontAwesome5
            name="thermometer-full"
            size={30}
            color={colors.black}
          />
        ),
      },
      {
        time: "4:00pm",
        title: "Open Blinds",
        icon: (
          <MaterialCommunityIcons
            name="blinds-open"
            size={30}
            color={colors.black}
          />
        ),
      },
      {
        time: "7:00pm",
        title: "Sunset",
        icon: <Feather name="sunset" size={30} color={colors.black} />,
      },
      {
        time: "12:00am",
        title: "Next Forecast Update",
        icon: <FontAwesome name="refresh" size={30} color={colors.black} />,
      },
    ];
    this.state = {
      refreshing: false,
    };
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({
        data: this.data, // add API call to update this.data
        refreshing: false,
      });
    }, 2000);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* <View style={styles.houseContainer}> 
            <Text style={styles.timelineText}> 
                House 1  
            </Text>        
          </View> */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // add backend connection to apply schedule
            Alert.alert("Optimizer", "Schedule Applied", [{ text: "Ok" }]);
          }}
        >
          <Text style={styles.buttonText}>Apply Optimized Schedule</Text>
        </TouchableOpacity>

        <View style={styles.timelineContainer} nestedScrollEnabled={true}>
          <Timeline
            style={styles.timeline}
            data={this.data}
            circleSize={40}
            circleColor={colors.white}
            lineColor={colors.orange}
            timeContainerStyle={{ minWidth: 72, marginTop: 0 }}
            timeStyle={{
              textAlign: "center",
              backgroundColor: colors.light,
              color: colors.black,
              padding: 5,
              borderRadius: 4,
              borderWidth: 2,
              borderColor: colors.logo_blue,
              marginTop: "10%",
            }}
            descriptionStyle={{ color: "gray" }}
            options={{
              style: { paddingTop: 5 },
              refreshControl: (
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              ),
            }}
            titleStyle={{ marginBottom: "10%" }}
            innerCircle={"icon"}
            separator={true}
          />
        </View>

        <View style={styles.energySavingsContainer}>
          <Text
            style={{
              color: colors.black,
              fontSize: 14,
              fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
              fontWeight: "bold",
              paddingLeft: "2%",
            }}
          >
            Estimated Energy Savings:{" "}
            <Text style={styles.energyText}>{energySavings} kWh</Text>
          </Text>

          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => {
              this.props.navigation.navigate("Energy Savings");
            }}
          >
            <Text style={styles.smallText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
  energyText: {
    color: "#1da32d",
    fontSize: 14,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
    paddingLeft: "2%",
  },
  smallText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
    paddingLeft: "2%",
  },
  button: {
    height: 60,
    width: "100%",
    borderRadius: 100,
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "5%",
    backgroundColor: colors.logo_blue,
    // borderWidth: 1,
    // borderColor: colors.secondary,
  },
  smallButton: {
    position: "absolute",
    right: "2%",
    bottom: "7%",
    height: 40,
    width: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
    backgroundColor: colors.logo_blue,
    // borderWidth: 1,
    // borderColor: colors.secondary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    padding: "4%",
  },
  timelineContainer: {
    flex: 1,
    height: 230,
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  timeline: {
    flex: 1,
    backgroundColor: colors.white,
    marginHorizontal: 0,
    width: "100%",
    padding: "5%",
  },
  energySavingsContainer: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: colors.silvergray,
    borderRadius: 5,
    justifyContent: "space-evenly",
  },
  houseContainer: {
    height: 30,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: colors.medium,
    marginBottom: 10,
  },
  timelineText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
});

export const OptimizedScheduleScreen = OptScheduleScreen;
