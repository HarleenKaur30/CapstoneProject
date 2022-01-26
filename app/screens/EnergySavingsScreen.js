import React from 'react';
import { Text, View, SafeAreaView, Button, Platform, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import colors from "../config/colors";
import { MaterialIcons, MaterialCommunityIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { LineChart, BarChart } from 'react-native-chart-kit';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

const temperatureData={
  labels: ["1:00am", "2:00am", "3:00am", "4:00am", "5:00am", "6:00am", "7:00am", "8:00am", "9:00am", "10:00am", "11:00am", "12:00pm",
  "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm", "7:00pm", "8:00pm", "9:00pm", "10:00pm", "11:00pm"],
  datasets: [ // set equal to imported array. array must be filled with 24 entries of desired house temperature
    {
      data: [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
      color: (opacity = 1) => colors.orange,
    },
    {// set equal to imported array. array must be filled with 24 entries temperature from weather API
      data: [10, 9, 8, 8, 7, 8, 10, 12, 15, 20, 22, 20, 21, 22, 20, 18, 15, 10, 10, 9, 8, 8, 9, 10],
      color: (opacity = 1) => colors.secondary,
    }
  ],
  legend: ['Indoor Temp', 'Outdoor Temp'],
}

const windowData={ // must import window names for house selected and corresponding weight in energy saving algorithm
  labels: ["Bathroom", "Bedroom", "Loft", "Kitchen"], 
  datasets: [
    {
      data: [0.25, 0.37, 0.82, 0.61],
      color: (opacity = 1) => colors.secondary,
    },
  ],
}

const energyData={ // must import energy savings data for house from app backend
  labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
  datasets: [
    {
      data: [10, 9, 8, 8, 7, 8, 10, 12, 15, 20,10, 9, 8, 8, 7, 8, 10, 12, 15, 20,10, 9, 8, 8, 7, 8, 10, 12, 15, 20],
    },
  ],
}

function EnergySavingsScreen({navigation}) {

  return (
    <SafeAreaView style={styles.parentContainer}>
      <View style={styles.house}> 
      {/* this text must be a dynamic variable set equal to the house selected from the Automation screen picker */}
      <Text style={styles.text}> 
          House 1  
        </Text>        
      </View>

      <ScrollView style={styles.scrollViewContainer}>

          <View style={styles.chartContainer1}>
            <Text style={styles.text}>
              Temperature Optimized Schedule
            </Text>
            <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true} // to hide scroll bar
            >
              <LineChart
                data={temperatureData}
                width={1200}
                height={220}
                verticalLabelRotation={0}
                yAxisSuffix="°C"
                xLabelsOffset={0}
                withShadow={false}
                withDots={false}
                chartConfig={{
                  backgroundColor: colors.white,
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientToOpacity: 0,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
                  strokeWidth: 3, 
                  useShadowColorFromDataset: false, // optional
                  fillShadowGradientOpacity: .25,
                  decimalPlaces: 0,
                }}
                bezier
              />
            </ScrollView>
          </View>

          <View style={styles.chartContainer2}>
            <Text style={styles.text}>
              Individual Window Impact on Energy Savings
            </Text>
            <BarChart
              data={windowData}
              width={0.9*Dimensions.get("window").width}
              height={220}
              chartConfig={{
                backgroundColor: colors.white,
                backgroundGradientFromOpacity: 0,
                backgroundGradientToOpacity: 0,
                color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`, 
                strokeWidth: 3,
                fillShadowGradient: colors.orange,
                fillShadowGradientOpacity: 1, 
              }}
              showValuesOnTopOfBars={true}
              fromZero={true}
            />
          </View>

          <View style={styles.chartContainer2}>
            <Text style={styles.text}>
              Energy Savings Over Past 30 Days
            </Text>
            <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true} // to hide scroll bar
            >
              <BarChart
                data={energyData}
                width={600}
                height={220}
                yAxisSuffix="kWh"
                chartConfig={{
                  backgroundColor: colors.white,
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientToOpacity: 0,
                  color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`, 
                  strokeWidth: 3,
                  fillShadowGradient: colors.secondary,
                  fillShadowGradientOpacity: 1,
                  barPercentage: .5,
                  barRadius: 10,
                }}
                showValuesOnTopOfBars={true}
                showBarTops={false}
                fromZero={true}
                style={{
                  marginLeft: 10,
                }}
              />
            </ScrollView>
          </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: colors.white,
    alignItems: "center",
    height: "100%",
    padding: "4%",
  },
  scrollViewContainer: {
    backgroundColor: colors.white,
    alignContent: "center",
    height: "90%",
    // padding: "5%",
  },
  chartContainer1: {
    height: 280,
    width: "99%",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: colors.medium,
    marginBottom: "5%",
    paddingTop: "2%",
  },
  chartContainer2: {
    height: 260,
    width: "99%",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: colors.medium,
    marginBottom: "5%",
    paddingTop: "2%",
  },
  text: {
    color: colors.black,
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
  house: {
    height: 30,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: colors.medium,
    marginBottom: 10,
  }
}); 

export default EnergySavingsScreen;