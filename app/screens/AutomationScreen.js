import React, { useState } from 'react';
import { Text, View, Picker, Platform, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import colors from "../config/colors";
import houses from "../config/houses";
import { MaterialCommunityIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import DropDownPicker from 'react-native-dropdown-picker'

function AutomationScreen({navigation}) {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
    {label: 'House 1', value: 'House 1'},
    {label: 'House 2', value: 'House 2'},
    {label: 'House 3', value: 'House 3'},
    {label: 'House 4', value: 'House 4'}, //need to dynamically change labels and values based on houses associated with a user
    ]);

    return (

        <View style={styles.container}>

            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder='Select a house'
                showTickIcon={true}
                closeAfterSelecting={true}
                listMode="SCROLLVIEW"
                    scrollViewProps={{
                    nestedScrollEnabled: true,
                }}
                containerStyle={{
                    width: "70%",
                    marginBottom: "2%"
                }}
            />

            <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>

                {/* View Optimized Schedule button */}
                <View style={styles.textContainer}>
                    <Text style={styles.buttonText}>View Optimized Schedule</Text>

                    <TouchableOpacity
                    style={styles.button}
                    
                    onPress={() => {
                        navigation.navigate("Optimized Schedule");
                    }}
                    >   
                        
                        <AntDesign
                            name="areachart"
                            size={100}
                            color={colors.orange}
                        />
                        
                    </TouchableOpacity>
                </View> 

                {/* View All Schedule button */}
                <View style={styles.textContainer}>
                    <Text style={styles.buttonText}>View All Schedules</Text>

                    <TouchableOpacity
                    style={styles.button}
                    
                    onPress={() => {
                        navigation.navigate("Schedule");
                    }}
                    >   
                        
                        <MaterialCommunityIcons
                            name="timetable"
                            size={100}
                            color={colors.orange}
                        />
                        
                    </TouchableOpacity>
                    
                </View> 

                {/* Create Schedule button */}
                <View style={styles.textContainer}>
                    <Text style={styles.buttonText}>Create New Schedule</Text>

                    <TouchableOpacity
                    style={styles.button}
                    
                    onPress={() => {
                        // add navigation schedule creation screen
                        Alert.alert(
                            "Custom Schedule",
                            "This will take you to a separate screen to create a schedule (once that screen is done)",
                            [{ text: "Ok" }]
                        )
                    }}
                    >   
                        
                        <Ionicons
                            name="create-outline"
                            size={100}
                            color={colors.orange}
                        />
                        
                    </TouchableOpacity>
                    
                </View> 

            </ScrollView>
        </View>
    );
}


 const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: "2%",  
        justifyContent: "center",  
        alignItems: "center",
      },
      houseContainer: {
        height: 70,
        width: "70%",
        alignItems: "center",
        // backgroundColor: colors.white,
        marginBottom: "1%",
        minHeight: 10,
        position: "relative",
      },
      scrollView: {
        backgroundColor: colors.white,
        marginHorizontal: 0,
        width: "100%",
      },
      textContainer: {
        height: 200,
        width: "100%",
        alignItems: "center",
        backgroundColor: colors.white,
        borderBottomColor: colors.light,
        borderBottomWidth: 1,
        marginTop: "3%",
        position: "relative"
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
}); 

export default AutomationScreen;