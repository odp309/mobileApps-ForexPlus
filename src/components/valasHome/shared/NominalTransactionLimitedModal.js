import { StyleSheet, Text, View, Image, Modal, StatusBar } from "react-native";
import React, { useState } from "react";
import StyledButton from "../../shared/StyledButton";
import { BodyLargeTextSemiBold, BodyRegularText } from "../../shared/StyledText";
import colors from "../../../theme/colors";

const NominalTransactionLimitedModal = ({ modalVisible, setModalVisible}) => {
  return (
    <Modal
      visible={modalVisible}
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
            source={require("../../../../assets/FindResult.png")}
            resizeMode="center"
            style={styles.icon}
          />
          <BodyRegularText style={styles.messageText}>
          Maaf, penarikan nominal tersebut belum tersedia. Silakan masukkan nominal lain.
          </BodyRegularText>
          <View style={styles.viewButton}>
            <StyledButton
              mode="primary"
              title="Kembali"
              titleStyle={{fontFamily:"poppins-medium",fontSize:18}}
              size={"lg"}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NominalTransactionLimitedModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBack: {
    marginTop: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  icon: {
    marginTop: -70,
    height:150,
    width:150
  },
  messageText: {
    width: "100%",
    textAlign: "center",
    color: colors.primary.primaryOne,
    marginTop: 10,
    lineHeight: 20,
  },
  viewButton: {
    width: "60%",
    justifyContent: "center",
    marginTop: 20,
  },
});
