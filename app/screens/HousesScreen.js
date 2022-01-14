import React from "react";
import { StyleSheet, FlatList, View, Alert } from "react-native";

import ListHouse from "../components/ListHouse";
import ListItemSeperator from "../components/ListItemSeperator";
import colors from "../config/colors";
import values from "../config/values";
import houses from "../config/houses";

function HousesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={houses}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListHouse
            houseName={item.name}
            numberBlinds={item.numberBlinds}
            onPress={() => navigation.navigate("Blinds", { house: item.title })}
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

export default HousesScreen;
