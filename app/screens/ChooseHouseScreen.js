import React from "react";
import { StyleSheet, Platform, FlatList, View, Alert } from "react-native";
<link
  href="https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto+Slab|Roboto:300,400,500,700"
  rel="stylesheet"
/>;

import ListHouse from "../components/ListHouse";
import ListItemSeperator from "../components/ListItemSeperator";
import colors from "../config/colors";
import values from "../config/values";

function ChooseHouseScreen({ navigation }) {
  const houses = [
    {
      title: "house1",
      id: values.houses.house1.id,
      name: values.houses.house1.name,
      numberBlinds: values.houses.house1.blinds,
    },
    {
      title: "house2",
      id: values.houses.house2.id,
      name: values.houses.house2.name,
      numberBlinds: values.houses.house2.blinds,
    },
    {
      title: "house3",
      id: values.houses.house3.id,
      name: values.houses.house3.name,
      numberBlinds: values.houses.house3.blinds,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={houses}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListHouse
            houseName={item.name}
            numberBlinds={item.numberBlinds}
            onPress={() =>
              values.maxNumberOfBlinds === item.numberBlinds
                ? Alert.alert(
                    "Blinds Could Not Be Added",
                    "The maximum number of blinds have already been added to this house.",
                    [{ text: "Ok" }]
                  )
                : navigation.navigate("Find Blinds", { ...item.title })
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