import { StyleSheet, Text, View, Image, Modal, StatusBar } from "react-native";
import React, { useState } from "react";
import StyledButton from "../../shared/StyledButton";
import { BodyMediumText } from "../../shared/StyledText";
import colors from "../../../theme/colors";
import { useNavigation } from "@react-navigation/core";

const CloseValasModal = ({isModalVisible, setModalVisible}) => { 
  const navigation = useNavigation();
  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={() => setModalVisible(false)}
      transparent={true}
      animationType="fade"
    >
      <StatusBar
        backgroundColor="rgba(0, 0, 0, 0.5)"
        barStyle="light-content"
        translucent={true}
      />
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Image
            source={require("../../../../assets/yes-no.png")}
            style={styles.icon}
          />
          <BodyMediumText style={styles.messageText}>
            Anda yakin ingin membatalkan transaksi?
          </BodyMediumText>
          <View style={styles.viewButton}>
            <View style={styles.buttonNo}>
              <StyledButton
                mode="primary-outlined"
                title="Tidak"
                onPress={() => setModalVisible(false)}
              />
            </View>
            <View style={styles.buttonYes}>
              <StyledButton
                mode="primary"
                title="Ya"
                onPress={() => {setModalVisible(false); navigation.goBack()}}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CloseValasModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "88%",
    height: "28%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  icon: {
    marginTop: -70,
  },
  messageText: {
    width: "77%",
    textAlign: "center",
    color: colors.primary.primaryOne,
    marginTop: 10,
  },
  viewButton: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  buttonYes: {
    width: "35%",
    marginHorizontal: 10,
  },
  buttonNo: {
    width: "35%",
    marginHorizontal: 10,
  },
});
