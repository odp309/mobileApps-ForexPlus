import React, { useState, useEffect } from "react";
import { Dimensions, Modal, ScrollView, StyleSheet, TouchableOpacity, View, Animated } from "react-native";
import { BodyLargeTextSemiBold, BodyMediumText } from "../shared/StyledText";
import colors from "../../theme/colors";
import { Ionicons } from "@expo/vector-icons";

const screenHeight = Dimensions.get("screen").height;

const ModalDaftarRekening = ({ modalVisible, setModalVisible, listRekening, selectedRekening, setSelectedRekening }) => {
  const slideAnim = useState(new Animated.Value(screenHeight))[0]; // Initial position is off-screen

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible, slideAnim]);

  useEffect(()=>{
    console.log("Selected Rekening : " + selectedRekening);
  },[selectedRekening])
  return (
    <View>
      <Modal
        visible={modalVisible}
        animationType="none"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.backgroundOverlay} onPress={() => setModalVisible(!modalVisible)} />
          <Animated.View style={[styles.modalView, { transform: [{ translateY: slideAnim }] }]}>
            <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => setModalVisible(!modalVisible)}>
              <Ionicons name="close" size={28} color={"black"} />
            </TouchableOpacity>
            <BodyLargeTextSemiBold style={styles.modalTitle}>Rekening</BodyLargeTextSemiBold>
            <ScrollView style={{ width: "100%" }}>
              {listRekening.map((item) => (
                <TouchableOpacity
                  style={styles.rekeningItem}
                  key={item.id}
                  onPress={() => {
                    setSelectedRekening(item); 
                    setModalVisible(false);
                  }}
                >
                  <BodyMediumText>{item.accountNumber}</BodyMediumText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.selectedRekening} onPress={() => setModalVisible(!modalVisible)}>
        <View>
          <BodyMediumText>{selectedRekening.accountNumber}</BodyMediumText>
          <BodyMediumText>{selectedRekening.type}</BodyMediumText>
        </View>
        <Ionicons name="chevron-down" size={22} color={colors.primary.primaryOne} style={{ marginTop: 3 }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: "3%",
    paddingBottom: 20,
    paddingHorizontal: "5%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minHeight: screenHeight * 0.3,
    maxHeight: screenHeight * 0.7,
  },
  modalTitle: {
    color: colors.primary.primaryOne,
    alignSelf: "center",
    fontSize: 20,
    marginBottom: 30,
  },
  rekeningItem: {
    borderWidth: 1,
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    marginVertical: 5,
    borderColor: colors.primary.primaryOne,
    alignItems: "center",
  },
  selectedRekening: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default ModalDaftarRekening;
