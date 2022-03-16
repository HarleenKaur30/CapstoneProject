import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Slider from "@react-native-community/slider";

import colors from "../config/colors";
import ip from "../config/ip";
import AppTextInput from "../components/AppTextInput";
import AppTextInput2 from "../components/AppTextInput2";

function BlindsInformationScreen({ route, navigation }) {
  const [tuyaID, setTuyaID] = useState(route.params.blindStringID);
  const [blindsName, setBlindsName] = useState();
  const [group, setGroup] = useState();
  const [storey, setStorey] = useState();
  const [height, setHeight] = useState();
  const [orientation, setOrientation] = useState();
  const [obstruction, setObstruction] = useState(0.5);

  SearchRecord = () => {
    var SearchAPIURL =
      "http://" + ip.ip + ":" + ip.port + "/api/search_blinds.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var data = {
      FindTuyaID: tuyaID,
    };

    fetch(SearchAPIURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        var blindsExist = Number(response[0].blindsExist.toString());
        if (blindsExist > 0) {
          Alert.alert(
            "Blinds Could Not Be Added",
            "Another user has already added these blinds to their account.",
            [{ text: "Ok" }]
          );
        } else {
          InsertRecord(
            tuyaID,
            blindsName,
            group,
            storey,
            height,
            orientation,
            obstruction
          );
        }
      })
      .catch((error) => {
        Alert.alert(
          "Blinds Could Not Be Added",
          "Error: " + error + ". Please try again later.",
          [{ text: "Ok" }]
        );
      });
  };

  InsertRecord = () => {
    if (blindsName.length == 0 || tuyaID.length == 0) {
      Alert.alert(
        "BLinds Could Not Be Added",
        "Please name the blinds and enter their ID.",
        [{ text: "Ok" }]
      );
    } else {
      {
        var InsertAPIURL =
          "http://" + ip.ip + ":" + ip.port + "/api/blind_addition.php";

        var headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
        };

        var data = {
          userID: global.userID,
          tuyaID: tuyaID,
          blindsName: blindsName,
          groupName: group,
          storey: storey,
          windowHeight: height,
          orientation: orientation,
          obstructionLevel: obstruction,
          houseID: route.params.houseID,
        };

        fetch(InsertAPIURL, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((response) => {
            Alert.alert("Blinds Added", response[0].Message, [
              {
                text: "Ok",
                onPress: () => SearchHouses(),
                //navigation.reset({
                //  index: 0,
                //  routes: [{ name: "Home" }],
                //}),
              },
            ]);
          })
          .catch((error) => {
            Alert.alert("Blinds Could Not Be Added", "Error Insert: " + error, [
              { text: "Ok" },
            ]);
          });
      }
    }
  };

  SearchHouses = () => {
    var SearchAPIURL =
      "http://" + ip.ip + ":" + ip.port + "/api/search_existing_houses.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var data = {
      FindUserID: global.userID,
    };

    fetch(SearchAPIURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        var numHouses = Number(response[0].numHouses.toString());
        response.shift();
        navigation.navigate("Home", {
          screen: "Home",
          params: { houses: response, numHouses: numHouses },
        });
      })
      .catch((error) => {
        Alert.alert("App Could Not be Loaded", "Error" + error, [
          { text: "Ok" },
        ]);
      });
  };

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
          onChangeText={(text) => setTuyaID(text)}
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
          Obstructed: {Number(obstruction * 100).toFixed(0)}%
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor={colors.medium}
          maximumTrackTintColor={colors.logo_blue}
          thumbTintColor={colors.medium}
          step={0.05}
          onValueChange={(numberValue) => setObstruction(numberValue)}
          value={0.5}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          SearchRecord(
            tuyaID,
            blindsName,
            group,
            storey,
            height,
            orientation,
            obstruction
          );
        }}
      >
        <Text style={styles.buttonText}>Finish Adding Blinds</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.logo_blue,
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
    borderTopColor: colors.logo_blue,
  },
  obstructionNoObstruction: {
    backgroundColor: colors.logo_blue,
    height: 50,
    width: 50,
    borderColor: colors.black,
    borderWidth: 3,
  },
  sectionContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: "5%",
    paddingTop: "4%",
    marginBottom: "2.5%",
    width: "100%",
  },
  sectionText: {
    color: colors.black,
    fontSize: 24,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
    textAlign: "center",
  },
  slider: {
    width: "100%",
    height: "3%",
  },
  sliderContainer: {
    paddingHorizontal: "10%",
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
