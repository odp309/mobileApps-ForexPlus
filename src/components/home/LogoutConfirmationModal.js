import { StyleSheet, View, Modal, Animated } from "react-native";
import React, { useRef, useEffect } from "react";
import StyledButton from "../shared/StyledButton";
import colors from "../../theme/colors";
import { logout } from "../../config/AuthConfig";
import { useNavigation } from "@react-navigation/native";
import { BodyMediumText, BodyXLTextSemiBold } from "../shared/StyledText";
import { StatusBar } from "expo-status-bar";

function LogoutConfirmationModal({ showModal, setShowModal }) {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (showModal) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showModal]);

  const handleLogout = () => {
    setShowModal(false);
    logout(navigation);
  };
  return (
    <Modal
      visible={showModal}
      transparent={true}
      onRequestClose={() => {
        setShowModal(false);
      }}
    >
      {showModal && (
        <StatusBar
          style="light"
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.5)"
        />
      )}
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContent,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <BodyXLTextSemiBold style={{ color: colors.primary.primaryOne }}>
            Konfirmasi
          </BodyXLTextSemiBold>
          <BodyMediumText style={{ textAlign: "center" }}>
            Apakah anda yakin ingin keluar dari aplikasi ini?
          </BodyMediumText>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <StyledButton
                mode={"primary"}
                title={"Ya"}
                size={"lg"}
                onPress={handleLogout}
                style={styles.buttonStyle}
                titleStyle={styles.buttonTitleStyle}
              />
            </View>
            <View style={styles.button}>
              <StyledButton
                mode={"primary-outlined"}
                title={"Tidak"}
                size={"lg"}
                titleStyle={styles.buttonTitleStyle}
                onPress={() => setShowModal(false)}
                style={[styles.buttonStyle, styles.outlinedButton]}
              />
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

export default LogoutConfirmationModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    minHeight: 220,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    position: "absolute",
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    width: "100%",
  },
  button: {
    width: "50%",
  },
  buttonStyle: {
    marginHorizontal: 10,
  },
  outlinedButton: {
    borderWidth: 1,
  },
  buttonTitleStyle: {
    fontSize: 20,
    fontFamily: "poppins-medium",
  },
});
