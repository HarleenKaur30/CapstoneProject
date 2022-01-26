import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";

import colors from "../config/colors";
import AppTextInput from "../components/AppTextInput";
import AppTextInput2 from "../components/AppTextInput2";

function BlindsInformationScreen({ navigation, route }) {
  const [blindsID, setBlindsID] = useState();
  const [blindsName, setBlindsName] = useState();
  const [group, setGroup] = useState();
  const [storey, setStorey] = useState();
  const [height, setHeight] = useState();
  const [orientation, setOrientation] = useState();
  const [obstruction, setObstruction] = useState();

  return (
    <ScrollView style={styles.container} bounces={false}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>Blinds Information</Text>
      </View>
      <View style={styles.inputContainer}>
        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="blinds"
          keyboardType="default"
          onChangeText={(text) => setBlindsID(text)}
          placeholder="Blinds ID"
          defaultValue={route.params.blindsStringID}
        />
        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="rename-box"
          keyboardType="default"
          onChangeText={(text) => setBlindsName(text)}
          placeholder="Blinds Name"
        />
        <AppTextInput
          autoCapitalize="sentences"
          autoCorrect={false}
          icon="group"
          keyboardType="default"
          onChangeText={(text) => setGroup(text)}
          placeholder="Group"
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>Window Information</Text>
      </View>
      <View style={styles.inputContainer}>
        <AppTextInput2
          autoCorrect={false}
          icon="level-up-alt"
          keyboardType="number-pad"
          onChangeText={(text) => setStorey(text)}
          placeholder="Storey Number"
        />
        <AppTextInput2
          autoCorrect={false}
          icon="ruler-vertical"
          keyboardType="numeric"
          onChangeText={(text) => setHeight(text)}
          placeholder="Window Height"
        />
        <AppTextInput
          autoCapitalize="sentences"
          autoCorrect={false}
          icon="compass-rose"
          keyboardType="default"
          onChangeText={(text) => setOrientation(text)}
          placeholder="Orientation (North, NorthWest, ...)"
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>Window Obstruction Level</Text>
      </View>
      <View style={styles.obstructionImageContainer}>
        <View style={styles.windowContainer}>
          <Text style={styles.windowText}>Not{"\n"}Obstructed</Text>
          <View style={styles.obstructionNoObstruction} />
        </View>
        <View style={styles.windowContainer}>
          <Text style={styles.windowText}>Half{"\n"}Obstructed</Text>
          <View style={styles.obstructionFullObstruction}>
            <View style={styles.obstructionHalfObstruction} />
          </View>
        </View>
        <View style={styles.windowContainer}>
          <Text style={styles.windowText}>Fully{"\n"}Obstructed</Text>
          <View style={styles.obstructionFullObstruction} />
        </View>
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderText}>
          Obstructed:{" "}
          {isNaN(obstruction) ? "50" : Number(obstruction * 100).toFixed(0)}%
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor={colors.medium}
          maximumTrackTintColor={colors.darkorange}
          thumbTintColor={colors.medium}
          step={0.05}
          onValueChange={(numberValue) => setObstruction(numberValue)}
          value={0.5}
        />
      </View>
      <View style={styles.sectionEndContainer} />
      <TouchableOpacity
        style={styles.button}
        //onPress={() =>
        //navigation.navigate("Blinds")
        //}
        // Need to change logic
      >
        <Text style={styles.buttonText}>Finish Adding Blinds</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.medium,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "3.5%",
    width: "90%",
    marginTop: "5%",
    marginBottom: "10%",
    marginHorizontal: "5%",
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
  container: {
    backgroundColor: colors.white,
    flexGrow: 1,
  },
  inputContainer: {
    paddingHorizontal: "5%",
    paddingBottom: "5%",
    backgroundColor: colors.white,
  },
  obstructionImageContainer: {
    backgroundColor: colors.white,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    paddingTop: "2%",
  },
  obstructionFullObstruction: {
    backgroundColor: colors.medium,
    height: 50,
    width: 50,
    borderColor: colors.black,
    borderWidth: 3,
  },
  obstructionHalfObstruction: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 44,
    borderTopWidth: 44,
    borderRightColor: "transparent",
    borderTopColor: colors.orange,
  },
  obstructionNoObstruction: {
    backgroundColor: colors.orange,
    height: 50,
    width: 50,
    borderColor: colors.black,
    borderWidth: 3,
  },
  sectionContainer: {
    backgroundColor: colors.darkorange,
    paddingHorizontal: "5%",
    paddingVertical: "4%",
    marginBottom: "2.5%",
    width: "100%",
  },
  sectionEndContainer: {
    backgroundColor: colors.darkorange,
    marginBottom: "2%",
    width: "100%",
    height: "0.25%",
  },
  sectionText: {
    color: colors.white,
    fontSize: 22,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
  slider: {
    width: "100%",
    height: "3%",
  },
  sliderContainer: {
    paddingHorizontal: "10%",
    //paddingBottom: "5%",
  },
  sliderText: {
    color: colors.medium,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: "4%",
    paddingTop: "3%",
  },
  windowContainer: {
    paddingBottom: "4%",
    alignItems: "center",
  },
  windowText: {
    color: colors.medium,
    fontSize: 12,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    textAlign: "center",
  },
});

export default BlindsInformationScreen;
