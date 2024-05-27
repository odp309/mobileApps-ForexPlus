import { StyleSheet, Text, View, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import StyledButton from "../../components/shared/StyledButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import sizes from "../../theme/sizes";
import colors from "../../theme/colors";

function LogoutConfirmationModal({ navigation }) {
  const [showModal, setShowModal] = useState(true);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("jwt_token");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error clearing user token:", error);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      const name = e.target.split("-");

      if (name[0] === "Keluar") {
        // Prevent default behavior
        e.preventDefault();
        setShowModal(true);
      }
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <Modal
      visible={showModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        setShowModal(false);
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <View style={styles.modalContent}>
          <Text style={styles.confirmationText}>Konfirmasi</Text>
          <Text style={{ textAlign: "center" }}>
            Apakah anda yakin ingin keluar dari aplikasi ini?
          </Text>
          <View
            style={{
              flexDirection: "row-reverse",
              width: "100%",
            }}
          >
            <View style={{ width: "50%" }}>
              <StyledButton
                mode={"primary"}
                title={"Ya"}
                size={"lg"}
                onPress={handleLogout}
                style={{ marginVertical: "5%", marginHorizontal: 10 }}
              />
            </View>
            <View style={{ width: "50%" }}>
              <StyledButton
                mode={"primary-outlined"}
                title={"Tidak"}
                size={"lg"}
                onPress={() => setShowModal(false)}
                style={{ marginVertical: "5%", marginHorizontal: 10 }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default LogoutConfirmationModal;

const styles = StyleSheet.create({
  modalContent: {
    width: "86%",
    minHeight: 220,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
  },
  confirmationText: {
    fontSize: sizes.font.large,
    fontFamily: "poppins-regular",
    color: colors.primary.primaryOne,
    fontWeight: "bold",
  },
});
