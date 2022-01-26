import React, { useState, Component } from 'react';
import {Text, View, Platform, Button, SafeAreaView} from 'react-native';
import { StyleSheet } from 'react-native';
import Icon from "../components/Icon";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from "../config/colors";
import AppButton from "../components/AppButton"

function AddScheduleScreen({navigation}) {
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <View>

      <View style={styles.timeWrapper}>
        <Text style={styles.sectionTitle}>Select Time</Text>
      </View>
    
      <MaterialCommunityIcons
          name="clock"
          size={40}
          style={styles.clockContainer}
          color={colors.orange}
        />


    {show && (
        <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="time"
            display="spinner"
            onChange={onChange}
            locale='en_GB.UTF-8'
        />
    )}

    <MaterialCommunityIcons
          name="blinds"
          size={40}
          style={styles.blindsContainer}
          color={colors.orange}
    />

    <View style={styles.timeWrapper}>
        <Text style={styles.sectionTitle}>Select Blind Level</Text>
    </View>
    
    
    
    <View style={styles.addButton}>
    <AppButton
        title="Add"
        onPress={() => {
        navigation.navigate("Schedule Display");
        }}
    />
    </View>

    <View style={styles.cancelButton}>
    <Button 
        title="Cancel"
        onPress={() => {
        navigation.navigate("Schedule Display");
        }}
    />
    </View>

    </View> 

  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
      timeWrapper: {
        paddingTop: 25,
        paddingBottom: 15,
        paddingLeft: 25,
        alignItems: 'center'
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
      },
      clockContainer: {
        position: 'absolute',
        top: '4%',
        left: '25%'
      },
      blindsContainer: {
        position: 'absolute',
        top: '68%',
        left: '18%'
      },
      addButton: {
        top: '70%',
        alignItems: 'center',
      },
      cancelButton: {
        alignItems: 'center',
        top: '70%'
      },
});

/*export default class AddSchedScreen extends Component {
    constructor(props){
      super(props)
      this.state = {time: "00:00"}
    }
  
    render(){
      return (
        <DatePicker
          style={{width: 200}}
          date={this.state.time}
          mode="time"
          placeholder="select time"
          format="HH:mm"
          minDate="00:00"
          maxDate="24:00"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          iconSource= 
          /*customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(time) => {this.setState({time: time})}}
        />
      )
    }
  }*/




export default AddScheduleScreen

