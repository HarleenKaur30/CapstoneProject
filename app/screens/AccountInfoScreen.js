import React, { useState } from "react";
import {
  Text,
  View,
  Platform,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";
import ip from "../config/ip";
import AppTextInput from "../components/AppTextInput";
import { useDerivedValue } from "react-native-reanimated";
import AppButton from "../components/AppButton";

function AccountScreen() {
    const [email, setEmail]=React.useState(global.email); // import these values either via API call to OAUTH or through a data base query
    const [password, setPassword]=React.useState(global.password);
    const [buffer, setbuffer]=React.useState(null);
    const [newPassword, setnewPassword] = useState();

    const [emailModalVisible, setemailModalVisible] = useState(false);
    const [passwordModalVisible, setpasswordModalVisible] = useState(false);

    const userID = global.userID;

    ChangeRecord = () => {
        newPassword;
    
        if (newPassword.length == 0) {
          Alert.alert(
            "Password could not be updated.",
            "New password cannot be blank."[
              { text: "Ok" }
            ]
          );
        } else {
          {
            var SearchAPIURL =
              "http://" + ip.ip + ":" + ip.port + "/api/password_reset.php";
    
            var headers = {
              Accept: "application/json",
              "Content-Type": "application/json",
            };
    
            var data = {
                userID: userID,
                newPassword: newPassword,
            };
    
            fetch(SearchAPIURL, {
              method: "POST",
              headers: headers,
              body: JSON.stringify(data),
            })
              .then((response) => response.json())
              .then((response) => {
                Alert.alert("Password Updated.", response[0].Message, [
                  {
                    text: "Ok",
                    onPress: () => navigation.navigate("Account Information")
                  },
                ]);
              })
              .catch((error) => {
                Alert.alert("Password could not be updated.", "Error Insert: " + error, [
                  { text: "Ok" },
                ]);
              });
          }
        }
      };
    

    return (
        <View style={styles.parentContainer}>
            <View style={styles.list}>
                <Text style={styles.textStyle}> Password: <Text style={styles.infoStyle}>{password}</Text></Text>
                <Pressable
                style={[styles.resetButton]}
                onPress={() => setpasswordModalVisible(true)}
                >
                    <Text style={styles.infoStyle}>Update</Text>
                </Pressable>
            </View>
            <View style={styles.list}>
                <Text style={styles.textStyle}> Email: <Text style={styles.infoStyle}>{email}</Text></Text>
                {/* <Pressable
                style={[styles.resetButton]}
                onPress={() => setemailModalVisible(true)}
                >
                    <Text style={styles.infoStyle}>Update</Text>
                </Pressable> */}
            </View>

            {/* <Modal
            animationType="slide"
            transparent={true}
            visible={emailModalVisible}
            onRequestClose={() => {
                setemailModalVisible(!emailModalVisible);
            }}
            >
                <View style={styles.popupParentContainer}>
                    <View style={styles.popupContainer}>
                        <View style={styles.instructionContainer}>
                            <Text style={styles.textStyle}>
                                Enter new email address
                            </Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            onChangeText={setbuffer}
                            placeholder="  new email"
                            keyboardType="email-address"
                        />
                        <Pressable
                            style={styles.OKButton}
                            onPress={() => {setemailModalVisible(!emailModalVisible), setEmail(buffer)}}
                        >
                            <Text style={styles.controlButtonText}>OK</Text>
                        </Pressable>
                        <Pressable
                            style={styles.cancelButton}
                            onPress={() => setemailModalVisible(!emailModalVisible) }
                        >
                            <Text style={styles.controlButtonText}>CANCEL</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal> */}

            <Modal
            animationType="slide"
            transparent={true}
            visible={passwordModalVisible}
            onRequestClose={() => {
                setpasswordModalVisible(!passwordModalVisible);
            }}
            >
                    <View style={styles.popupParentContainer}>
                    <View style={styles.popupContainer}>
                        <View style={styles.instructionContainer}>
                            <Text style={styles.textStyle}>
                                Enter new password
                            </Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="  new password"
                            onChangeText={(text) => setnewPassword(text)}
                        />

                        <Pressable
                            style={styles.OKButton}
                            onPress={() => {setpasswordModalVisible(!passwordModalVisible), setPassword(newPassword),
                                ChangeRecord(newPassword, userID)
                              }}
                        >
                            <Text style={styles.controlButtonText}>OK</Text>
                        </Pressable>
                        <Pressable
                            style={styles.cancelButton}
                            onPress={() => setpasswordModalVisible(!passwordModalVisible)}
                        >
                            <Text style={styles.controlButtonText}>CANCEL</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>


        </View>
    );
}

const styles = StyleSheet.create({
    parentContainer: {
    height: "100%",
    backgroundColor: colors.white,
    padding: "2%",
    alignItems: "center",
    },
    list: {
    height: 60,
    width: "100%",
    padding: "5%",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    },
    textStyle: {
    color: colors.black,
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
    },
    infoStyle: {
    color: colors.black,
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "normal",
    },
    resetButton: {
    height: 30,
    width: "25%",
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.orange,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2%",
    position: "absolute",
    right: "5%",
    },
    popupParentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    },
    popupContainer: {
    width: "90%",
    height: 150,
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
    },
    OKButton: {
    backgroundColor: colors.white,
    position: "absolute",
    bottom: "10%",
    right: "15%",
    },
    cancelButton: {
    backgroundColor: colors.white,
    position: "absolute",
    bottom: "10%",
    right: "35%",
    },
    controlButtonText: {
    color: "blue",
    fontSize: 15,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "normal",

    },
    input: {
    height: "30%",
    width: "90%",
    borderWidth: 1,
    borderColor: colors.black,
    position: "absolute",
    top: "30%",
    right: "5%",
    },
    instructionContainer: {
        height: "15%",
        width: "90%",
        position: "absolute",
        top: "10%",
        right: "5%",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default AccountScreen;
