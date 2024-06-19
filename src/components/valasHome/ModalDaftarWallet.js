import React, { useState, useMemo, useEffect } from "react";
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  BodyLargeTextSemiBold,
  BodyMediumText,
  BodyMediumTextSemiBold,
  BodyXLTextBold,
} from "../shared/StyledText";
import colors from "../../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import Input from "../shared/Input";

const screenHeight = Dimensions.get("screen").height;

const ModalDaftarWallet = ({
  modalVisible,
  setModalVisible,
  listWallet,
  selectedWallet,
  setSelectedWallet,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const slideAnim = useState(new Animated.Value(screenHeight))[0];

  const filteredWallet = useMemo(() => {
    return listWallet.filter((item) =>
      item.currencyName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, listWallet]);

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
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible, slideAnim]);

  useEffect(() => {
    // console.log(selectedWallet);
  }, [selectedWallet]);

  return (
    <View>
      <Modal
        visible={modalVisible}
        animationType="none"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
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
            <View
              style={{
                width: "15%",
                height: 5,
                backgroundColor: colors.color.lightGrey,
                marginBottom: 20,
                borderRadius: 50,
              }}
            />
            <BodyMediumText style={{ fontSize: 18, marginBottom: 5 }}>
              Dompet Valas
            </BodyMediumText>
            <View
              style={{
                width: "100%",
                height: 4,
                backgroundColor: colors.primary.primaryThree,
                marginBottom: 10,
              }}
            />
            <View style={{ width: "100%", paddingHorizontal: "5%" }}>
              <Input
                mode={"active"}
                hasLeftIcon={true}
                leftIconName={"search"}
                iconColor={colors.primary.primaryOne}
                style={{
                  paddingLeft: 50,
                  paddingVertical: 5,
                  backgroundColor: "rgba(253,231,223, 0.5)",
                }}
                placeholder=""
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
            </View>
            {filteredWallet && (
              <ScrollView style={{ width: "100%", paddingHorizontal: "5%" }}>
                {filteredWallet.map((item) => (
                  <TouchableOpacity
                    style={styles.walletItem}
                    key={item.id}
                    onPress={() => {
                      setSelectedWallet(item);
                      setModalVisible(false);
                    }}
                  >
                    <Image
                      resizeMode="stretch"
                      style={{ width: 25, height: 25, marginRight: 15 }}
                      source={{ uri: item.flagIcon }}
                    />
                    <BodyMediumTextSemiBold
                      style={{ color: colors.primary.primaryOne }}
                    >
                      {item.currencyName} ({item.currencyCode})
                    </BodyMediumTextSemiBold>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </Animated.View>
        </KeyboardAvoidingView>
      </Modal>
      <TouchableOpacity
        style={styles.selectedWallet}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: -6 }}
        >
          <Image
            resizeMode="stretch"
            style={{ width: 24, height: 24, marginRight: 10 }}
            source={{ uri: selectedWallet.flagIcon }}
          />
          <BodyXLTextBold
            style={{
              color: colors.primary.primaryOne,
              fontSize: 23,
              marginTop: 5,
            }}
          >
            {selectedWallet.currencyCode}
          </BodyXLTextBold>
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
  },
  modalTitle: {
    color: colors.primary.primaryOne,
    alignSelf: "center",
    fontSize: 20,
    marginBottom: 30,
  },
  walletItem: {
    borderBottomWidth: 0.5,
    width: "100%",
    padding: 10,
    flexDirection: "row",
    marginVertical: 1,
    borderColor: colors.primary.primaryTwo,
    alignItems: "center",
  },
  selectedWallet: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});

export default ModalDaftarWallet;
