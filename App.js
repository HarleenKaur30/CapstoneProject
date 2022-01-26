import LoginScreen from "./app/screens/LoginScreen";
import HomeScreen from "./app/screens/HomeScreen";
import TestScreen from "./app/screens/TestScreen";
import Tabs from "./app/screens/Tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddDeviceScreen from "./app/screens/AddDeviceScreen";
import AddHouseScreen from "./app/screens/AddHouseScreen";
import ChooseHouseScreen from "./app/screens/ChooseHouseScreen";
import FindBlindsScreen from "./app/screens/FindBlindsScreen";
import HousesScreen from "./app/screens/HousesScreen";
import BlindsScreen from "./app/screens/BlindsScreen";
import BlindsInformationScreen from "./app/screens/BlindsInformationScreen";
import QRCodeScreen from "./app/screens/QRCodeScreen";
import OptimizedScheduleScreen from "./app/screens/OptimizedScheduleScreenWithEnergy";
import EnergySavingsScreen from "./app/screens/EnergySavingsScreen";
import colors from "./app/config/colors";

import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

//This navigator is responsible for moving across different stack screens
const Stack = createNativeStackNavigator();

/* Note that in the code below, nested navaigation is being used.
 Tab Navigator defined on the Tabs.js is nested within the Stack Navigator.
 Add new screens to the Navigation Container below and then use button press events on the corresponding screens to move to the stacked screen you would like to. */

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs">
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={({ navigation }) => ({
            headerShown: false,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Add Device")}
              >
                <MaterialIcons name="add" size={30} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Add Device" component={AddDeviceScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
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
        <Stack.Screen
          name="Blinds Information"
          component={BlindsInformationScreen}
          options={{ title: "Add Blinds" }}
        />
        <Stack.Screen name="Optimized Schedule" component={OptimizedScheduleScreen} />
        <Stack.Screen name="Energy Savings" component={EnergySavingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
