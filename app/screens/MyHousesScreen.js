import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Button, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function MyHousesScreen({navigation}) {
    return (
        <View style={styles.container}>

            {/*My Houses*/}
            <View style={styles.housesWrapper}>
            <Text style={styles.sectionTitle}>My Houses</Text>

            <View style={styles.items}>
            </View>

            <Button
                title="Add House"
                onPress={() => navigation.navigate("Add House")}
            />


            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    housesWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    items: {
        marginTop: 30,
    },
});


export default MyHousesScreen;