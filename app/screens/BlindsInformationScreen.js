import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
//import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import colors from "../config/colors";
import AppTextInput from "../components/AppTextInput";
import AppTextInput2 from "../components/AppTextInput2";

function BlindsInformationScreen({ navigation, route }) {
  const [blindsID, setBlindsID] = useState();
  const [group, setGroup] = useState();
  const [storey, setStorey] = useState();
  const [height, setHeight] = useState();
  const [orientation, setOrientation] = useState();

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView behavior="position">
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
            defaultValue={route.params.blindsID}
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
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: "5%",
    paddingBottom: "5%",
    backgroundColor: colors.white,
  },
  sectionContainer: {
    backgroundColor: colors.darkorange,
    paddingHorizontal: "5%",
    paddingVertical: "4%",
    marginBottom: "2.5%",
    width: "100%",
  },
  sectionText: {
    color: colors.white,
    fontSize: 22,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
});

export default BlindsInformationScreen;
