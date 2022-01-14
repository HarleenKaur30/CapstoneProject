/* This file creates differents tabs for the tab bar: Home, Add Device, Schedule, Automation */

import * as React from "react";
import HomeScreen from "./HomeScreen";
import AddDeviceScreen from "./AddDeviceScreen";
import ScheduleScreen from "./ScheduleScreen";
import AutomationScreen from "./AutomationScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import ChooseHouseScreen from "./ChooseHouseScreen";
import { FontAwesome5 } from "@expo/vector-icons";

/* This tab navigator is responsible for the navigation of tabs */
const Tab = createBottomTabNavigator();

//Defines the tabs in the tab bar
function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.darkorange,
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
        name="Your Houses"
        component={ChooseHouseScreen}
        options={{
          tabBarLabel: "Houses",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="house-user" size={size} color={color} />
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
      />
      <Tab.Screen
        name="Automation"
        component={AutomationScreen}
        options={{
          tabBarLabel: "Automation",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="star" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
