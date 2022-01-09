import * as React from 'react';
import HomeScreen from './HomeScreen';
import AddDeviceScreen from './AddDeviceScreen';
import ScheduleScreen from './ScheduleScreen';
import AutomationScreen from './AutomationScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import colors from "../config/colors";


const Tab = createBottomTabNavigator();

function Tabs() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        options={{ headerShown: false }}
        screenOptions={{
          tabBarActiveTintColor: colors.darkorange,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Add Device"
          component={AddDeviceScreen}
          options={{
            tabBarLabel: 'Add Device',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="add" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Schedule"
          component={ScheduleScreen}
          options={{
            tabBarLabel: 'Schedule',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="calendar-clock" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Automation"
          component={AutomationScreen}
          options={{
            tabBarLabel: 'Automation',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="star" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  export default Tabs;