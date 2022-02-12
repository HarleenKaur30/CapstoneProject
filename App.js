import LoginScreen from "./app/screens/LoginScreen";

import Tabs from "./app/screens/Tabs";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddHouseScreen from "./app/screens/AddHouseScreen";
import ChooseHouseScreen from "./app/screens/ChooseHouseScreen";
import FindBlindsScreen from "./app/screens/FindBlindsScreen";
import HousesScreen from "./app/screens/HousesScreen";
import BlindsScreen from "./app/screens/BlindsScreen";
import BlindsInformationScreen from "./app/screens/BlindsInformationScreen";
import EditBlindsInformationScreen from "./app/screens/EditBlindsInformationScreen";
import QRCodeScreen from "./app/screens/QRCodeScreen";
import OptimizedScheduleScreen from "./app/screens/OptimizedScheduleScreenWithEnergy";
import EnergySavingsScreen from "./app/screens/EnergySavingsScreen";
import ShowBlindsScreen from "./app/screens/ShowBlindsScreen";
import colors from "./app/config/colors";

import { TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import AddHouseScreentest from "./app/screens/AddHouseScreentest";
import { ScheduleDisplayScreen } from "./app/screens/ScheduleDisplayScreen";
import AddScheduleScreen from "./app/screens/AddScheduleScreen";
import BlindsOnScheduleScreen from "./app/screens/BlindsOnScheduleScreen";

// function to get screen title from nested navigation
function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route);
  return routeName;
}

//This navigator is responsible for moving across different stack screens
const Stack = createNativeStackNavigator();

/* Note that in the code below, nested navigation is being used.
 Tab Navigator defined on the Tabs.js is nested within the Stack Navigator.
 Add new screens to the Navigation Container below and then use button press events on the corresponding screens to move to the stacked screen you would like to. */

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs">
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={({ navigation, route }) => ({
            //headerShown: false,
            headerTitle: getHeaderTitle(route),
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => {
                  Alert.alert(
                    "Log out current user?",
                    "Select OK to continue",
                    [
                      { text: "Cancel" },
                      {
                        text: "OK",
                        onPress: () => navigation.navigate("Login Screen"),
                      }, // flush user login info
                    ]
                  );
                }}
              >
                <Text style={styles.headerButtonText}>Log Out</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Add House" component={AddHouseScreen} />
        <Stack.Screen
          name="Choose House"
          component={ChooseHouseScreen}
          options={{ title: "Add Blinds" }}
        />
        <Stack.Screen name="Find Blinds" component={FindBlindsScreen} />
        <Stack.Screen name="Houses" component={HousesScreen} />
        <Stack.Screen name="Blinds" component={BlindsScreen} />
        <Stack.Screen name="QR Scanner" component={QRCodeScreen} />
        <Stack.Screen name="View Blinds" component={ShowBlindsScreen} />
        <Stack.Screen
          name="Blinds Information"
          component={BlindsInformationScreen}
          options={{ title: "Add Blinds" }}
        />
        <Stack.Screen
          name="Edit Blinds Information"
          component={EditBlindsInformationScreen}
          options={{ title: "Edit Blinds" }}
        />
        <Stack.Screen
          name="Optimized Schedule"
          component={OptimizedScheduleScreen}
        />
        <Stack.Screen name="Energy Savings" component={EnergySavingsScreen} />
        <Stack.Screen
          name="Schedule Display"
          component={ScheduleDisplayScreen}
        />
        <Stack.Screen
          name="Add Schedule Component"
          component={AddScheduleScreen}
        />
        <Stack.Screen
          name="Blinds Active On Schedule"
          component={BlindsOnScheduleScreen}
        />
        <Stack.Screen name="Login Screen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  /* headerButton: {
    height: 35,
    width: 100,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    padding: "2%",
    backgroundColor: colors.orange,
    marginRight: 10,
  }, */

  headerButton: {
    height: 35,
    width: 100,
    //borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    padding: "2%",
    //backgroundColor: colors.orange,
    //marginRight: 1,
  },
  headerButtonText: {
    color: colors.dimgray,
    fontSize: 15,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    //fontWeight: "bold",
  },
});
