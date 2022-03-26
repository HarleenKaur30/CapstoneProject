/* This file creates differents tabs for the tab bar: Home, Add Device, Schedule, Automation */

import React, { useState } from "react";
import HomeScreen from "./HomeScreen";
import AddDeviceScreen from "./AddDeviceScreen";
import ScheduleScreen from "./ScheduleScreen";
import AutomationScreen from "./AutomationScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import ip from "../config/ip";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

/* This tab navigator is responsible for the navigation of tabs */
const Tab = createBottomTabNavigator();

//Defines the tabs in the tab bar
function Tabs({ route }) {
  const navigation = useNavigation();
  var schedules = route.params.params.schedules;
  var numSchedules = route.params.params.numSchedules;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.logo_blue,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Add Device"
        component={AddDeviceScreen}
        options={{
          tabBarLabel: "Add Device",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarLabel: "Schedule",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-clock"
              color={color}
              size={size}
            />
          ),
        }}
        initialParams={{ schedules: schedules, numSchedules: numSchedules }}
      />
      <Tab.Screen
        name="Automation"
        component={AutomationScreen}
        options={{
          tabBarLabel: "Automation",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="auto-awesome" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
