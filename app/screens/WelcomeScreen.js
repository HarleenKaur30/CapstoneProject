import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';

function WelcomeScreen(props) {
    return (
     <ImageBackground 
    style={styles.background}
    source = {require("../assets/background.jpg")}
     >  
         <Image style= {styles.logo} source={require("../assets/logo.jpg")} />
         
         <View style={styles.loginButton}>
        <Text> Login</Text>
         </View>

         <View style={styles.registerButton}></View>

     </ImageBackground>
    );
}

const styles = StyleSheet.create({
background: {
flex : 1,
justifyContent: "flex-end",
alignItems: "center",
},
loginButton: {
    width: '100%',
    height: 70,
    backgroundColor: '#fc5c65'
},
registerButton: {
    width: '100%',
    height: 70,
    backgroundColor: '#4ecdc4'
},
logo: {
    width: 124,
    height: 100,
    position: "absolute",
    top: 350,
}
});

export default WelcomeScreen;