import { StyleSheet, View,TouchableOpacity,Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { BottomSheet } from "@rneui/themed";
import {
    BodyRegularText,
    BodyMediumText,
    BodyLargeText,
    HeadingSixText,
  } from "../../../components/shared/StyledText";
import WalletSource from "../../../components/valasHome/shared/WalletSource";
import colors from "../../../theme/colors";
import StyledButton from "../../../components/shared/StyledButton";
import { useNavigation } from "@react-navigation/native";

const ConfirmationModal = ({isVisible,toggleBottomSheet, pendapatan, kurs, inputSaldo }) => {
  const navigation = useNavigation();
  const toPinVerification = () => {
    toggleBottomSheet();
    navigation.navigate("PinConfirmation");
  }
  return (
    <BottomSheet isVisible={isVisible}>
      <View style={styles.modalContent}>
        {/* CLOSE BUTTON */}
        <View
          style={{ width: "100%", alignItems: "flex-end", paddingRight: 20 }}
        >
          <TouchableOpacity onPress={toggleBottomSheet}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* CONFIRMATION TITLE */}
        <HeadingSixText style={styles.confirmationTextTitle}>
          Konfirmasi Penjualan Valas
        </HeadingSixText>

        {/* TYPE OF VALAS */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            width: "100%",
            padding: 20,
          }}
        >
          <View>
            <Image
              source={require("../../../../assets/icons/flags/Japan.png")}
              style={{ width: 50, height: 50, marginRight: 10 }}
            />
          </View>
          <View>
            <BodyLargeText style={{ fontWeight: "bold" }}>
              Yen Jepang
            </BodyLargeText>
            <BodyMediumText>JPY</BodyMediumText>
          </View>
        </View>

        {/* SUMMARY */}
        <View
          style={{
            width: "100%",
            borderBottomWidth: 5,
            borderColor: colors.primary.primaryThree,
            paddingVertical: 26,
          }}
        >
          <View style={styles.confirmationText}>
            <BodyRegularText>Nominal Pendapatan</BodyRegularText>
            <BodyRegularText style={{ fontWeight: "bold" }}>
              IDR {pendapatan}
            </BodyRegularText>
          </View>
          <View style={styles.confirmationText}>
            <BodyRegularText>Kurs Jual</BodyRegularText>
            <BodyRegularText style={{ fontWeight: "bold" }}>
              JPY 1 = RP. {kurs}
            </BodyRegularText>
          </View>
          <View style={styles.confirmationText}>
            <BodyRegularText>Total Transaksi</BodyRegularText>
            <BodyRegularText style={{ fontWeight: "bold" }}>
              JPY {inputSaldo}
            </BodyRegularText>
          </View>
        </View>

        {/* DOMPET SUMBER */}
        <View>
          <WalletSource style={{ backgroundColor: colors.color.white }} />
        </View>

        {/* JUAL BUTTON */}
        <View
          style={{
            width: "100%",
          }}
        >
          <View style={{ width: "100%" }}>
            <StyledButton
              mode={"primary"}
              title={"Jual"}
              size={"lg"}
              onPress={toPinVerification}
              style={{ marginVertical: "5%", marginHorizontal: 10 }}
            />
          </View>
        </View>
      </View>
    </BottomSheet>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  container: {},
  modalContent: {
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  confirmationTextTitle: {
    color: colors.primary.primaryOne,
    fontWeight: "bold",
  },
  confirmationText: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
