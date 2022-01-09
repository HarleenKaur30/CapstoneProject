import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import Icon from "../components/Icon";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function TestScreen(props) {

    return (
        <SafeAreaView>
            <Text>Test Screen</Text>
        </SafeAreaView>
    );
}


/* const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
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
}); */

export default TestScreen;