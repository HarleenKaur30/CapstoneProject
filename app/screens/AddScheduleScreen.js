import React, { useState, Component } from 'react';
import {Text, View, Platform, Button, ScrollView, SafeAreaView, ImageBackground} from 'react-native';
import { StyleSheet } from 'react-native';
import Icon from "../components/Icon";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import VerticalSlider from "rn-vertical-slider";
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

function AddScheduleScreen({ navigation }) {
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('time');
    const [text, setText] = useState('No Time Chosen');
    const [newOpenPercentage, setNewOpenPercentage] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let ftime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
    setText(ftime)
  };

  const showMode = (currentMode) =>  {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>

      <View style={styles.timeWrapper}>
        <Text style={styles.sectionTitle}>Select Time</Text>
        <MaterialCommunityIcons
          name="clock"
          size={40}
          style={styles.clockContainer}
          color={colors.logo_blue}
        />
      </View>

      <View style={styles.selectorButton}>
        <AppButton onPress={showTimepicker} title="Open Selector" />
        <Text style={{fontSize: 18}}>{text}</Text>
      </View>

     

      {show && (
        <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={onChange}
            locale='en_GB.UTF-8'
        />
      )}


      <View style={styles.timeWrapper}>
        <Text style={styles.sectionTitle}>Select Blind Level</Text>
      </View>
    
        <View style={styles.blindHeader} />
        <View style={styles.blindContainer}>
          <ImageBackground
            source={require("../assets/window.jpg")}
            style={styles.blindImage}
          >
            <View
              style={{
                width: "100%",
                height: isNaN(100)
                  ? "" + 100 - 0 + "%"
                  : "" + 100 - newOpenPercentage + "%",
                backgroundColor: "#E2DCCD",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                borderColor: colors.dark,
                borderWidth: 3,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Text style={styles.sliderPullText}>Pull</Text>
              <View style={styles.blindButton} />
            </View>
            <View
              style={{ width: "100%", height: "100%", position: "absolute" }}
            >
              <VerticalSlider
                value={
                  isNaN(newOpenPercentage)
                    ? 100
                    : newOpenPercentage
                }
                disabled={false}
                min={0}
                max={100}
                onChange={(numberValue) => setNewOpenPercentage(numberValue)}
                width="100%"
                height={325}
                step={1}
                minimumTrackTintColor="transparent"
                maximumTrackTintColor={"transparent"}
              />
            </View>
          </ImageBackground>
        </View>
        <Text style={styles.sliderText}>
          {isNaN(newOpenPercentage)
            ? 100
            : newOpenPercentage}
          % Open
        </Text>
    

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

</ScrollView>

  );
};

const styles = StyleSheet.create({
      container: {
        backgroundColor: colors.white,
        flex: 1,
        alignItems: "center",
        padding: "5%",
      },
      timeWrapper: {
        alignItems: "center",
        paddingTop: '5%'
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
      },
      clockContainer: {
        alignItems: "center"

      },
      blindsContainer: {
        alignItems: "center"
      },
      addButton: {
        alignItems: 'center',
      },
      cancelButton: {
        alignItems: 'center',
        paddingBottom: '20%'
      },
      selectorButton: {
        alignItems: 'center',
    },
    blindButton: {
      backgroundColor: colors.medium,
      marginBottom: "5%",
      width: "15%",
      height: 10,
      borderRadius: 20,
      alignItems: 'center',
    },
    blindContainer: {
      width: "80%",
      height: 325,
      borderColor: colors.dark,
      borderTopWidth: 0,
      borderWidth: 3,
      backgroundColor: colors.white,
      left: "10%"
    },
    blindImage: {
      width: "100%",
      height: 323,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      alignItems: 'center',
    },
    blindHeader: {
      width: "85%",
      height: "5%",
      backgroundColor: colors.dark,
      marginTop: "3%",
      alignItems: 'center',
      left: "8%"
    },
    button: {
      backgroundColor: colors.logo_blue,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: "3.5%",
      width: "90%",
      marginVertical: "2.5%",
      marginHorizontal: "5%",
      alignItems: 'center',
    },
    buttonText: {
      color: colors.white,
      fontSize: 18,
      fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
      fontWeight: "bold",
      textAlign: "center",
    },
    sliderPullText: {
      color: colors.medium,
      fontSize: 12,
      fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
      textAlign: "center",
      fontWeight: "bold",
      paddingBottom: "1%",
    },
    sliderText: {
      color: colors.medium,
      fontSize: 18,
      fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
      textAlign: "center",
      fontWeight: "bold",
      paddingBottom: "4%",
      paddingTop: "3%",
    },
    text: {
      color: colors.black,
      fontSize: 20,
      fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
      fontWeight: "bold",
      marginRight: "5%",
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

