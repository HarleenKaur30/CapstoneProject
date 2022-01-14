import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  View,
  Image,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import colors from "../../app/config/colors";
import values from "../../app/config/values";
import Button from "../components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { Card } from "react-native-elements";
import ChooseHouseScreen from "./ChooseHouseScreen";

const HomeScreen = ({ navigation }) => {
  const [houseCount, setHouseCount] = useState(values.houses.number);

  if (!houseCount) {
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

        <Button
          title="My Houses"
          onPress={() => navigation.navigate("My Houses")} />
      </SafeAreaView>
    );
  } else {
    return <ChooseHouseScreen />;
  }
};

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

  scrolling: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});

export default HomeScreen;
