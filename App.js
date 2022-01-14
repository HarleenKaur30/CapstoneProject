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
import colors from "./app/config/colors";

//This navigator is responsible for moving across different stack screens
const Stack = createNativeStackNavigator();

/* Note that in the code below, nested navaigation is being used.
 Tab Navigator defined on the Tabs.js is nested within the Stack Navigator.
 Add new screens to the Navigation Contaniner below and then use button press events on the corresponding screens to move to the stacked screen you would like to. */

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs">
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Add Device" component={AddDeviceScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="Add House" component={AddHouseScreen} />
        <Stack.Screen
          name="Choose House"
          component={ChooseHouseScreen}
          options={{
            title: "Add Blinds",
            headerStyle: { backgroundColor: colors.orangered },
            headerTintColor: colors.white,
          }}
        />
        <Stack.Screen name="Find Blinds" component={FindBlindsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
