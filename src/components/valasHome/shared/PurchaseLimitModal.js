import { StyleSheet, Text, View, Image, Modal, StatusBar } from "react-native";
import React, { useState } from "react";
import StyledButton from "../../shared/StyledButton";
import { BodyLargeTextSemiBold, BodyRegularText } from "../../shared/StyledText";
import colors from "../../../theme/colors";

const CloseLimitModal = ({ modalVisible, setModalVisible,currencyCode,limit }) => {
  const B = (props) => (
    <BodyLargeTextSemiBold style={{ fontWeight: "bold", fontSize: 17 }}>{props.children}</BodyLargeTextSemiBold>
  );

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
            source={require("../../../../assets/limit.png")}
            style={styles.icon}
          />
          <BodyRegularText style={styles.messageText}>
            Limit <B>{currencyCode} {limit}</B> pembelian valas bulanan Anda sudah habis.
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

export default CloseLimitModal;

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
  },
  messageText: {
    width: "90%",
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
