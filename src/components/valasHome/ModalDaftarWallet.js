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
} from "react-native";
import {
  BodyLargeTextSemiBold,
  BodyMediumText,
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
            <TouchableOpacity
              style={{ alignSelf: "flex-end" }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Ionicons name="close" size={28} color={"black"} />
            </TouchableOpacity>
            <BodyLargeTextSemiBold style={styles.modalTitle}>
              List Mata Uang
            </BodyLargeTextSemiBold>
            <View style={{ width: "100%", position: "relative" }}>
              <Input
                mode={"active"}
                hasLeftIcon={true}
                leftIconName={"search"}
                iconColor={colors.primary.primaryOne}
                style={{ paddingLeft: 50 }}
                placeholder="Search"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
            </View>
            <ScrollView style={{ width: "100%" }}>
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
                    style={{ width: 30, height: 30, marginRight: 15 }}
                    source={{uri: item.flagIcon}}
                  />
                  <BodyMediumText>
                    {item.currencyName} ({item.currencyCode})
                  </BodyMediumText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.selectedWallet}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            resizeMode="stretch"
            style={{ width: 30, height: 30, marginRight: 15 }}
            source={{uri : selectedWallet.flagIcon}}
          />
          <BodyXLTextBold style={{ color: colors.primary.primaryOne }}>
            {selectedWallet.currencyCode}
          </BodyXLTextBold>
        </View>
        <Ionicons
          name="chevron-down"
          size={22}
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
    paddingHorizontal: "5%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: screenHeight * 0.7,
    minHeight: screenHeight * 0.6,
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
