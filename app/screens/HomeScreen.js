import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import colors from "../../app/config/colors";
import values from "../../app/config/values";
import Button from "../components/Button";
import { MaterialIcons } from "@expo/vector-icons";

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <MaterialIcons
        style={styles.icon}
        name="library-add"
        size={60}
        color="lightgray"
      />

      <Button
        title="Add Device"
        onPress={() => navigation.navigate("Add Device")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
});

export default HomeScreen;
