import React from 'react';
import { Text, View, SafeAreaView, Button, Platform } from 'react-native';
import Tabs from '../screens/Tabs';


function HomeScreen({navigation}) {

    return (
        <SafeAreaView>
            <Text>Home Screen</Text>

            < Button
             title="Go to Test"
            onPress={() => navigation.navigate("Test")}
             />

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

export default HomeScreen;