import LoginScreen from "./app/screens/LoginScreen";
import HomeScreen from "./app/screens/HomeScreen";

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
import EditBlindsInformationScreen from "./app/screens/EditBlindsInformationScreen";
import QRCodeScreen from "./app/screens/QRCodeScreen";
import OptimizedScheduleScreen from "./app/screens/OptimizedScheduleScreen";
import EnergySavingsScreen from "./app/screens/EnergySavingsScreen";
import ShowBlindsScreen from "./app/screens/ShowBlindsScreen";
import ScheduleScreen from "./app/screens/ScheduleScreen";
import colors from "./app/config/colors";

import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AddHouseScreentest from "./app/screens/AddHouseScreentest";
import { ScheduleDisplayScreen } from "./app/screens/ScheduleDisplayScreen";
import AddScheduleScreen from "./app/screens/AddScheduleScreen";
import BlindsOnScheduleScreen from "./app/screens/BlindsOnScheduleScreen";
import ScheduleScreen from "./app/screens/ScheduleScreen";

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
<<<<<<< Updated upstream
=======
          name="Edit Blinds Information"
          component={EditBlindsInformationScreen}
          options={{ title: "Edit Blinds" }}
        />
        <Stack.Screen
>>>>>>> Stashed changes
          name="Optimized Schedule"
          component={OptimizedScheduleScreen}
        />
        <Stack.Screen name="Energy Savings" component={EnergySavingsScreen} />
<<<<<<< Updated upstream
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
=======
        <Stack.Screen name="Schedules" component={ScheduleScreen} />
>>>>>>> Stashed changes
      </Stack.Navigator>
    </NavigationContainer>
  );
}
