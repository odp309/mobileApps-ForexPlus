import { View, Text, Alert, BackHandler,StyleSheet,Modal } from "react-native";
import React, { useEffect, useState } from "react";
import StyledButton from "../../components/shared/StyledButton";  
import { useNavigation } from "@react-navigation/native"; 
import { logout } from "../../config/AuthConfig";

const ExitScreen = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation();
  const exitApp = () => {
    BackHandler.exitApp();
  };
  return (
    <View
      style={{ flex: 1, justifyContent: "center",}}
    > 
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>  
          <StyledButton
            mode={"primary"}
            title={"Logout"}
            size={"lg"}
            onPress={()=> logout(navigation)}
            style={{ marginVertical: "5%" }}
          />
          <StyledButton
            mode={"primary-outlined"}
            title={"Cancel"}
            size={"lg"}
            onPress={() =>{}}
            style={{ marginVertical: "5%" }}
          />
        </View>
      </View> 
    </View>
  );
};

export default ExitScreen;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: "8%",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: "5%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
