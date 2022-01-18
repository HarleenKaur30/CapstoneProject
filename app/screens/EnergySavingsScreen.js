import React from 'react';
import { Text, View, SafeAreaView, Button, Platform, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import Timeline from 'react-native-timeline-flatlist';
import colors from "../config/colors";
import { MaterialCommunityIcons, AntDesign, Ionicons } from "@expo/vector-icons";


function EnergySavingsScreen({navigation}) {

    return (
        <SafeAreaView style={styles.container}>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: "5%",
      },
      scrollView: {
        backgroundColor: colors.white,
        marginHorizontal: 0,
      },
      textContainer: {
        height: 230,
        width: "100%",
        alignItems: "center",
        backgroundColor: colors.white,
        borderWidth: 4,
        borderRadius: 25,
        borderColor: colors.medium,
        padding: "5%",
        marginBottom: "3%",
      },
      buttonText: {
        color: colors.black,
        fontSize: 18,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
        fontWeight: "bold",
      },
      button: {
        height: 150,
        width: 150,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "5%",
        padding: "5%",
        top: "5%",
        backgroundColor: colors.light,
        borderWidth: 1,
        borderColor: colors.secondary,
      },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
}); 

export default EnergySavingsScreen;