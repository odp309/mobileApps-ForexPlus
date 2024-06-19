import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import {
  BodyLargeText,
  BodyLargeTextSemiBold,
  BodyMediumText,
  BodySmallText,
} from "../shared/StyledText";
import colors from "../../theme/colors";
import { Ionicons } from "@expo/vector-icons";

const screenHeight = Dimensions.get("screen").height;

const ModalDaftarRekening = ({
  modalVisible,
  setModalVisible,
  listRekening,
  selectedRekening,
  setSelectedRekening,
}) => {
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

  useEffect(() => {
    // console.log("Selected Rekening : " + selectedRekening);
  }, [selectedRekening]);

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
          <TouchableOpacity
            style={styles.backgroundOverlay}
            onPress={() => setModalVisible(!modalVisible)}
          />
          <Animated.View
            style={[
              styles.modalView,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            {/* <TouchableOpacity
              style={{ alignSelf: "flex-end", marginRight:10}}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Ionicons name="close" size={28} color={"black"} />
            </TouchableOpacity> */}
            <View
              style={{
                width: "15%",
                height: 5,
                backgroundColor: colors.color.lightGrey,
                marginBottom: 20,
                borderRadius: 50,
              }}
            />
            <BodyMediumText style={styles.modalTitle}>
              Nomor Rekening
            </BodyMediumText>
            <View
              style={{
                width: "100%",
                height: 4,
                backgroundColor: colors.primary.primaryThree,
                marginBottom: 20,
              }}
            />
            {listRekening && (
              <ScrollView style={{ width: "100%", paddingHorizontal: 20 }}>
                {listRekening.map((item) => (
                  <TouchableOpacity
                    style={styles.rekeningItem}
                    key={item.id}
                    onPress={() => {
                      setSelectedRekening(item);
                      setModalVisible(false);
                    }}
                  >
                    <View>
                    <BodyMediumText style={{fontSize:18 ,lineHeight:24}}>{item.accountNumber}</BodyMediumText>
                    <BodyMediumText style={{fontSize:14}}>{item.type}</BodyMediumText>
                    </View>
                    <Ionicons
                      name={item===selectedRekening ? "radio-button-on" : "radio-button-off"}
                      size={24}
                      color={colors.primary.primaryOne}
                      style={{ marginTop: 3 }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </Animated.View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.selectedRekening}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <View>
          <BodyMediumText style={{fontSize:20, marginBottom:-6}}>{selectedRekening.accountNumber}</BodyMediumText>
          <BodyMediumText style={{fontSize:14}}>{selectedRekening.type}</BodyMediumText>
        </View>
        <Ionicons
          name="chevron-down"
          size={20}
          color={colors.primary.primaryOne}
          style={{ marginTop: 3 }}
        />
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
    alignSelf: "center",
    fontSize: 18,
    marginBottom: 5,
  },
  rekeningItem: { 
    width: "100%",
    paddingHorizontal: 10,
    paddingBottom : 10,
    flexDirection: "row",
    justifyContent: "space-between", 
    borderColor: colors.primary.primaryOne,
    alignItems: "center",
  },
  selectedRekening: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
});

export default ModalDaftarRekening;
