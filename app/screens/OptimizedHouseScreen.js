import React from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";

import ListHouse from "../components/ListHouse";
import ListItemSeperator from "../components/ListItemSeperator";
import colors from "../config/colors";
import values from "../config/values";

function OptimizedHouseScreen({ navigation, route }) {
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
              navigation.navigate("Optimized Schedule", {
                houseID: item.houseID,
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
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default OptimizedHouseScreen;
