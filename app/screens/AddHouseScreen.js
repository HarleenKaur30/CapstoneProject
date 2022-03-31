import React, { useState, useEffect } from "react";
import {
  Alert,
  Text,
  View,
  NativeModules,
  StyleSheet,
  Platform,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import ip from "../config/ip";
import DropDownPicker from "react-native-dropdown-picker";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

function AddHouseScreen({ route /*navigation*/ }) {
  const navigation = useNavigation();
  const [location, setLocation] = useState();
  const [city, setCity] = useState();
  const [pin, setPin] = useState({
    latitude: 13.406,
    longitude: 123.3753,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [houseName, sethouseName] = useState();
  const [UsualTemp, setUsualTemp] = useState(0);
  const [desiredInternaltemp, setdesiredInternalTemp] = useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Edmonton", value: "Edmonton" },
    { label: "Calgary", value: "Calgary" },
    { label: "Toronto", value: "Toronto" },
    { label: "Vancouver", value: "Vancouver" },
  ]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      let place = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      let city;
      place.find((p) => {
        city = p.city;
        setCity(p.city);
      });

      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(city);
  }

  /*SearchRecord = () => {
    var SearchAPIURL =
      "http://" + ip.ip + ":" + ip.port + "/api/search_blinds.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
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
            houseName,
            city,
            latitude,
            longitude,
            desiredInternaltemp,
            UsualTemp
          );
        }
      })
      .catch((error) => {
        Alert.alert(
          "House Could Not Be Added",
          "Error: " + error + ". Please try again later.",
          [{ text: "Ok" }]
        );
      });
  };*/

  InsertRecord = () => {
    houseName, city, desiredInternaltemp, UsualTemp;

    if (houseName.length == 0 || desiredInternaltemp.length == 0) {
      Alert.alert(
        "House Could Not Be Added",
        "Please name the house, select location, and set desired temperature."[
          { text: "Ok" }
        ]
      );
    } else {
      {
        var InsertAPIURL =
          "http://" + ip.ip + ":" + ip.port + "/api/house_addition.php";

        var headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
        };

        var data = {
          houseName: houseName,
          location: city,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          userID: global.userID,
          desiredInternalTemp: desiredInternaltemp,
          numBlinds: 0,
          UsualTemp: UsualTemp,
        };

        fetch(InsertAPIURL, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((response) => {
            Alert.alert("House Added", response[0].Message, [
              {
                text: "Ok",
                onPress: () => SearchHouses(),
              },
            ]);
          })
          .catch((error) => {
            Alert.alert("House Could Not Be Added", "Error Insert: " + error, [
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
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.locationWrapper}>
          <Text style={styles.sectionTitle}>Location</Text>
          <Text style={styles.secondaryTitle}>Auto-location</Text>
          <Text> City: {text} </Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 53.5232,
              longitude: 113.5263,
            }}
            region={pin}
          >
            <Marker coordinate={pin} />
          </MapView>
        </View>

        <MaterialCommunityIcons
          name="map-marker"
          size={40}
          style={styles.mapmarkerContainer}
          color={colors.logo_blue}
        />

        <Text style={styles.secondaryTitle}>OR Manually Choose Location</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={(text) => setCity(text)}
        />

        <View style={styles.nicknameWrapper}>
          <Text style={styles.sectionTitle}>House Nickname</Text>
        </View>

        <AppTextInput
          autoCapitalize="words"
          autoCorrect={false}
          icon="home"
          keyboardType="default"
          onChangeText={(text) => sethouseName(text)}
          placeholder="Input House Nickname"
        />

        <View style={styles.usualtempWrapper}>
          <Text style={styles.sectionTitle}>Usual Temperature</Text>
        </View>

        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="thermometer"
          keyboardType="numeric"
          onChangeText={(text) => setUsualTemp(text)}
          placeholder="Input Temperature (degrees Celsius)"
        />

        <View style={styles.desiredtempWrapper}>
          <Text style={styles.sectionTitle}>Desired Temperature</Text>
        </View>

        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="thermometer"
          keyboardType="numeric"
          onChangeText={(text) => setdesiredInternalTemp(text)}
          placeholder="Input Temperature (degrees Celsius)"
        />

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              InsertRecord(houseName, city, desiredInternaltemp, UsualTemp);
            }}
          >
            <Text style={styles.buttonText}>Finish Adding House</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    padding: "5%",
    //paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
  },
  locationWrapper: {
    paddingTop: 25,
    paddingBottom: 15,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
  },
  picker: {
    height: 10,
    width: 600,
    marginTop: -75,
  },
  map: {
    width: Dimensions.get("window").width,
    height: 300,
  },
  mapmarkerContainer: {
    position: "absolute",
    right: "70%",
    top: "4.5%",
  },
  nicknameWrapper: {
    paddingTop: 25,
    paddingBottom: 20,
  },
  usualtempWrapper: {
    paddingTop: 25,
    paddingBottom: 20,
  },
  desiredtempWrapper: {
    paddingTop: 25,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: colors.logo_blue,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "1%",
    width: "69%",
    marginVertical: "2.5%",
    marginHorizontal: "5%",
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AddHouseScreen;
