import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import StyledButton from "../../../components/shared/StyledButton"; 
import { Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  BodyLargeTextSemiBold,
  BodyMediumText,
  BodyMediumTextSemiBold,
} from "../../../components/shared/StyledText";
import colors from "../../../theme/colors";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const ModalTransferConfirmation = ({data, modalVisible, setModalVisible,nominal,onPress }) => {
  const navigation = useNavigation();
  return (
    <View>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={styles.modalContainer} 
        >
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{ alignSelf: "flex-end" }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Ionicons name="close" size={28} color={"black"} />
            </TouchableOpacity>
            <BodyLargeTextSemiBold
              style={{
                color: colors.primary.primaryOne,
                alignSelf: "center",
                fontSize: 20,
                marginBottom: 30,
              }}
            >
              Konfirmasi Transfer Valas
            </BodyLargeTextSemiBold>

            <View>
              <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                <BodyMediumText>Nama Penerima</BodyMediumText>
                <BodyMediumTextSemiBold>{data.nama}</BodyMediumTextSemiBold>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                <BodyMediumText>Total Transfer</BodyMediumText>
                <BodyMediumTextSemiBold>SGD {nominal}</BodyMediumTextSemiBold>
              </View>
            </View>

            <StyledButton
              mode={"primary"}
              title={"Transfer"}
              size={"lg"}
              onPress={onPress}
              style={{ marginVertical: "5%" }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalTransferConfirmation;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height: screenHeight,
  },
  modalContainer: {
    justifyContent: "flex-end",
    flex: 1,
    alignItems: "center",
    width: "100%",
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
