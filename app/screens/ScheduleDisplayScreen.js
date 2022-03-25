import React, { Component, useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
  Alert,
  DynamicColorIOS,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import ip from "../config/ip";
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";
import Timeline from "react-native-timeline-flatlist";
import AppButton from "../components/AppButton";
import { render } from "react-dom";
import AppTextInput from "../components/AppTextInput";

export default class ScheduleDisScreen extends Component {
  constructor(props) {
    super(props);
    this.data = props.route.params.data;
    this.scheduleName = "Schedule Name";
    this.state = {
      refreshing: false,
      data: "",
    };
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({
        data: this.props.route.params.data, // add API call to update this.data
        refreshing: false,
      });
    }, 2000);
  };

  handleDelete = (message, scheduleName) => {
    this.setState({
      data: this.data.filter((m) => m.timeName !== message.timeName),
      refreshing: false,
    });
    this.timeName = message.timeName;
    this.DeleteRecord(this.scheduleName, this.timeName);
  };

  DeleteRecord = () => {
    var InsertAPIURL =
      "http://" + ip.ip + ":" + ip.port + "/api/delete_schedulePart.php";

    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var data = {
      userID: global.userID,
      scheduleName: this.scheduleName, //change to variable
      timeName: this.timeName,
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
        Alert.alert("Schedule Could Not Be Updated", "Error Insert: " + error, [
          { text: "Ok" },
        ]);
      });
  };

  render() {
    /*if (
      (Object.keys(this.state.data).length == 0) &
      (Object.keys(this.data).length == 0)
    ) {
      console.log(this.state.data);
      console.log("And", this.data);
      return (
        <View style={styles.noScheduleContainer}>
          <Text style={styles.noScheduleText}>Schedule Empty.</Text>

          <AppButton
            title="Add To Schedule"
            onPress={() =>
              this.props.navigation.navigate("Add Schedule Component", {
                screen: "Add Schedule Component",
                params: {
                  scheduleName:
                    "To Be Added" // change to whatever variable the scheduleName is stored in //,
                },
              })
            }
          />
        </View>
      );
    }
    */

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.nameWrapper} /* ANGELA START */>
          <AppTextInput
            autoCapitalize="words"
            autoCorrect={false}
            icon="home"
            keyboardType="default"
            onChangeText={(scheduleName) => this.setState({ scheduleName })}
            placeholder={
              this.scheduleName ? this.scheduleName : "Input Schedule Name"
            }
          />
          <Text style={styles.smallText}>
            {"Pull to show changes to schedule."}
          </Text>
        </View>
        <View style={styles.scrollView} nestedScrollEnabled={true}>
          <Timeline
            style={styles.timeline}
            data={this.state.data}
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
            iconDefault={
              <MaterialCommunityIcons
                name="blinds"
                size={30}
                color={colors.black}
              />
            }
            onEventPress={(item) =>
              /*alert(`${item.title} at ${item.time}`)*/
              Alert.alert(
                "Schedule Item Menu",
                "What would you like to do with this schedule item?",
                [
                  { text: "Cancel" },
                  /*{
                    text: "Edit",
                    onPress: () =>
                      navigation.navigate("Add Schedule Component", {
                        screen: "Add Schedule Component",
                        params: {
                          scheduleName:
                            "To Be Added" // change to whatever variable the scheduleName is stored in //,
                        },
                      }),
                  },*/
                  {
                    text: "Delete",
                    onPress: () =>
                      Alert.alert(
                        "Delete",
                        "Are you sure you would like to delete this schedule item?",
                        [
                          { text: "Cancel" },
                          {
                            text: "Yes",
                            onPress: () =>
                              this.handleDelete(item, this.scheduleName),
                          },
                        ]
                      ),
                  },
                ]
              )
            }
            separator={true}
            //timeContainerStyle={{minWidth:72}}
          />
        </View>

        <View styles={styles.bottomContainer}>
          <AppButton
            title="Add To Schedule"
            onPress={() =>
              this.props.navigation.navigate("Add Schedule Component", {
                screen: "Add Schedule Component",
                params: {
                  scheduleName:
                    this
                      .scheduleName /* change to whatever variable the scheduleName is stored in */,
                },
              })
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  noScheduleContainer: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
  },
  noScheduleText: {
    color: colors.black,
    paddingBottom: "10%",
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
  buttonText: {
    color: colors.black,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
  smallText: {
    color: colors.black,
    fontSize: 14,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
    paddingLeft: "2%",
  },
  button: {
    height: "10%",
    width: "100%",
    borderRadius: 100,
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "5%",
    backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  roundButton: {
    height: 63,
    width: 63,
    borderRadius: 100,
    position: "absolute",
    top: "3%",
    right: "4%",
    justifyContent: "space-evenly",
    padding: "5%",
    backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: colors.secondary,
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
    backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    padding: "5%",
  },
  timelineIcon: {
    width: 30,
    height: 30,
  },
  timeline: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.white,
    marginHorizontal: 0,
    width: "100%",
    padding: "5%",
  },
  bottomContainer: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "-20%",
    width: "50%",
  },
  nameWrapper: {
    alignItems: "center",
    padding: "2%",
  },
});

export const ScheduleDisplayScreen = ScheduleDisScreen;
