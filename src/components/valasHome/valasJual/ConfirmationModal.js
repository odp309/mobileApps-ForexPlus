import {
  StyleSheet,
  View,
  Modal,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  HeadingSixText,
} from "../shared/StyledText";
import StyledButton from "../shared/StyledButton";
import colors from "../../theme/colors";
import { AntDesign } from "@expo/vector-icons";

const ConfirmationModal = ({ navigation, modalVisibility, onDataReceived }) => {
  const handleLogout = async () => {
    try {
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error Confirmation:", error);
    }
  };

  // Send the false boolean to the Screen component to make the modal disappear
  const onClose = () => {
    const closeModal = false;
    onDataReceived(closeModal);
  };

  return (
    <Modal
      visible={modalVisibility}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        onClose;
      }}
    >
      <View
        style={{
          height: Dimensions.get("window").height,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
      >
        <View></View>
        <View style={styles.modalContent}>
          <View style={{ width: "100%", alignItems: "flex-end" }}>
            <TouchableOpacity onPress={onClose}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <HeadingSixText style={styles.confirmationText}>
            Konfirmasi Penjualan Valas
          </HeadingSixText>
          <Text style={{ textAlign: "center" }}>Content </Text>
          <View
            style={{
              flexDirection: "row-reverse",
              width: "100%",
            }}
          >
            <View style={{ width: "100%" }}>
              <StyledButton
                mode={"primary"}
                title={"Jual"}
                size={"lg"}
                onPress={handleLogout}
                style={{ marginVertical: "5%", marginHorizontal: 10 }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  modalContent: {
    width: "100%",
    height: "60%",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  confirmationText: {
    color: colors.primary.primaryOne,
    fontWeight: "bold",
  },
});
