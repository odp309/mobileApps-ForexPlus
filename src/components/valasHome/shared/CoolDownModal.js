import { StyleSheet, Text, View, Image, Modal } from "react-native";
import React, { useState } from "react";
import StyledButton from "../../shared/StyledButton";
import { BodyRegularText } from "../../shared/StyledText";
import colors from "../../../theme/colors";
import { StatusBar } from "expo-status-bar";

const PurchaseLimitModal = ({ modalVisible, setModalVisible }) => {
  const B = (props) => (
    <Text style={{ fontWeight: "bold", fontSize: 16 }}>{props.children}</Text>
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
        style="dark"
        translucent={true}
      />
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Image
            source={require("../../../../assets/cool-down.png")}
            style={styles.icon}
          />
          <BodyRegularText style={styles.messageText}>
            Fitur ini masih terkunci <B>selama 3 hari</B> karena ketidakhadiran
            Anda pada reservasi sebelumnya.
          </BodyRegularText>
          <View style={styles.viewButton}>
            <StyledButton
              mode="primary"
              title="Kembali"
              size={"lg"}
              titleStyle={{fontSize:18,fontFamily:"poppins-medium"}}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PurchaseLimitModal;

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
    lineHeight: 18,
  },
  viewButton: {
    width: "60%",
    justifyContent: "center",
    marginTop: 20,
  },
});
