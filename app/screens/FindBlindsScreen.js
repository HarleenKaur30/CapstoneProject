import React from "react";
import { StyleSheet, View, FlatList, Alert } from "react-native";

import ListOptions from "../components/ListOptions";
import ListItemSeperator from "../components/ListItemSeperator";
import colors from "../config/colors";

function FindBlindsScreen({ navigation }) {
  const options = [
    { id: 1, name: "Scan QR Code", icon: "qrcode-scan" },
    { id: 2, name: "Tuya Find Device General Search", icon: "radar" },
    { id: 3, name: "Manually Enter Blind ID", icon: "square-edit-outline" },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={options}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListOptions
            optionName={item.name}
            iconName={item.icon}
            onPress={() =>
              item.id === 1
                ? navigation.navigate("QR Scanner")
                : item.id === 2
                ? Alert.alert(
                    "Cannot Complete Action",
                    "This functionality has not yet been added to this app.",
                    [{ text: "Ok" }]
                  )
                : navigation.navigate("Blinds Information", {
                    blindsID: "Blinds ID",
                  })
            }
          />
        )}
        ItemSeparatorComponent={ListItemSeperator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    //padding: "5%",
    //alignItems: "center",
  },
  qrButtonContainer: {
    backgroundColor: colors.logo_blue,
    height: "25%",
    width: "100%",
    flexDirection: "row",
    padding: "5%",
    alignItems: "center",
    borderRadius: 25,
  },
  text: {
    color: colors.white,
    fontSize: 25,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    paddingHorizontal: "5%",
    //fontWeight: "bold",
  },
});

export default FindBlindsScreen;
