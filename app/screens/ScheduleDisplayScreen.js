import React, {Component} from 'react';
import { Text, View, SafeAreaView, Platform, StyleSheet, TouchableOpacity, ScrollView, Image, RefreshControl, Alert, DynamicColorIOS} from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { MaterialCommunityIcons, AntDesign, FontAwesome, Feather, FontAwesome5 } from "@expo/vector-icons";
import Timeline from 'react-native-timeline-flatlist'
import AppButton from "../components/AppButton";
import { render } from 'react-dom';


export default class ScheduleDisScreen extends Component {
    
  constructor(props){
    super(props)
    this.data = [ // import this from local buffer, filled from API at midnight each day
      
      {time: '09:00am', title: 'Move Blinds to 10%', icon: <MaterialCommunityIcons name="blinds-open" size={30} color={colors.black}/>},
      {time: '12:00pm', title: 'Move Blinds to 70%', icon: <MaterialCommunityIcons name="blinds" size={30} color={colors.black}/>},
      {time: '3:00pm', title: 'Move Blinds to 86%', icon: <MaterialCommunityIcons name="blinds" size={30} color={colors.black}/>},
      {time: '5:00pm', title: 'Move Blinds to 44%', icon: <MaterialCommunityIcons name="blinds-open" size={30} color={colors.black}/>},
      {time: '7:00pm', title: 'Move Blinds to 24%', icon: <MaterialCommunityIcons name="blinds-open" size={30} color={colors.black}/>},
      {time: '10:00pm', title: 'Move Blinds to 10%', icon: <MaterialCommunityIcons name="blinds-open" size={30} color={colors.black}/>},
      {time: '10:30pm', title: 'Move Blinds to 8%', icon: <MaterialCommunityIcons name="blinds-open" size={30} color={colors.black}/>},
      {time: '11:00pm', title: 'Move Blinds to 5%', icon: <MaterialCommunityIcons name="blinds-open" size={30} color={colors.black}/>},
      {time: '11:30pm', title: 'Move Blinds to 2%', icon: <MaterialCommunityIcons name="blinds-open" size={30} color={colors.black}/>},
      
    ]
    this.state = {
      refreshing: false,
    };
   
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({
        data: this.data, // add API call to update this.data
        refreshing: false
      });
    }, 2000);
  } 

  render() {
    
    if (Object.keys(this.data).length == 0) {
        return (
          <View style={styles.noScheduleContainer}>
            <Text style={styles.noScheduleText}>
              Schedule Empty. 
            </Text>
          
          <AppButton
            title="Add To Schedule"
            onPress={() => navigation.navigate("Add Schedule Component")}
            />
          </View>
        );
    }


    return (
        <SafeAreaView style={styles.container}>

          <View style={styles.scrollView} nestedScrollEnabled={true}>
            <Timeline 
              style={styles.timeline}
              data={this.data}
              circleSize={40}
              circleColor={colors.white}
              lineColor={colors.orange}
              timeContainerStyle={{minWidth:52, marginTop: 0}}
              timeStyle={{textAlign: 'center', backgroundColor: colors.light, color: colors.black, padding:5, borderRadius:4, borderWidth:2, borderColor: colors.logo_blue, marginTop: "10%"}}
              descriptionStyle={{color:'gray'}}
              options={{
                style:{paddingTop:5},
                refreshControl: (
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                  />
                ),
              }}
              titleStyle={{marginBottom: "10%"}}
              innerCircle={'icon'}
              onEventPress={(item) => 
                /*alert(`${item.title} at ${item.time}`)*/
                Alert.alert(
                    "Schedule Item Menu",
                    "What would you like to do with this schedule item?",
                    [
                      { text: "Cancel" },
                      {
                        text: "Edit",
                        onPress: () =>
                            this.props.navigation.navigate("Add Schedule Component"),
                      },
                      {
                        text: "Delete",
                        onPress: () =>
                          Alert.alert(
                            "Delete",
                            "Are you sure you would like to delete this schedule item?",
                            [
                              { text: "Cancel" },
                              { text: "Yes", onPress: () => handleDelete(item) },
                            ]
                          ),
                      },
                    ]
                  )
                }
              separator={true}
              timeContainerStyle={{minWidth:72}}
            />
            </View>

            <View styles={styles.bottomContainer}>
                <AppButton
                    title="Add To Schedule"
                    onPress={() => {
                        this.props.navigation.navigate("Add Schedule Component");
                    }}
                />
            </View>

        </SafeAreaView>
    );
  }

}


const styles = StyleSheet.create({
  noScheduleContainer: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
  },
  noScheduleText: {
    color: colors.black,
    paddingBottom: "10%",
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
  buttonText: {
    color: colors.black,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
  smallText: {
    color: colors.black,
    fontSize: 14,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
    paddingLeft: "2%",
  },
  button: {
    height: "10%",
    width: "100%",
    borderRadius: 100,
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "5%",
    backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  roundButton: {
    height: 63,
    width: 63,
    borderRadius: 100,
    position: "absolute",
    top: "3%",
    right: "4%",
    justifyContent: "space-evenly",
    padding: "5%",
    backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  smallButton: {
    position: "absolute",
    right: "2%",
    bottom: "7%",
    height: 40,
    width: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
    backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    padding: "5%",
  },
  timelineIcon: {
    width: 30,
    height: 30,
  },
  timeline: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.white,
    marginHorizontal: 0,
    width: "100%",
    padding: "5%",
  },
  bottomContainer: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "-20%",
    width: "50%"
  }
}); 

export const ScheduleDisplayScreen = ScheduleDisScreen;