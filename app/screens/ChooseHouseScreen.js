import React from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";

import ListHouse from "../components/ListHouse";
import ListItemSeperator from "../components/ListItemSeperator";
import colors from "../config/colors";
import values from "../config/values";

function ChooseHouseScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={route.params.houses}
        keyExtractor={(message) => message.houseID.toString()}
        renderItem={({ item }) => (
          <ListHouse
            houseName={item.houseName}
            numberBlinds={item.numBlinds}
            onPress={() =>
              values.maxNumberOfBlinds == item.numBlinds
                ? Alert.alert(
                    "Blinds Could Not Be Added",
                    "The maximum number of blinds have already been added to this house.",
                    [{ text: "Ok" }]
                  )
                : navigation.navigate("Find Blinds", { houseID: item.houseID })
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
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default ChooseHouseScreen;
