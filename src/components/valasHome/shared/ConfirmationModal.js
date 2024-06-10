import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { BottomSheet } from "@rneui/themed";
import {
  BodyRegularText,
  BodyMediumText,
  BodyLargeText,
  HeadingSixText,
} from "../../shared/StyledText";
import WalletSource from "./WalletValasSource";
import colors from "../../../theme/colors";
import StyledButton from "../../shared/StyledButton";
import { useNavigation } from "@react-navigation/native";

const ConfirmationModal = ({
  isVisible,
  toggleBottomSheet,
  title,
  pendapatan,
  kurs,
  inputSaldo,
  transactionType,
  namaPenerima,
  totalTransfer
}) => {
  const navigation = useNavigation();
  const toPinVerification = () => {
    toggleBottomSheet();
    navigation.navigate("PinConfirmation");
  };
  return (
    <BottomSheet isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View
            style={{ width: "100%", alignItems: "flex-end", paddingRight: 20 }}
          >
            <TouchableOpacity onPress={toggleBottomSheet}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={{ width: "100%", alignItems: "center" }}>
            <HeadingSixText style={styles.confirmationTextTitle}>
              {title}
            </HeadingSixText>
          </View>
        </View>

        <View style={styles.middleContainer}>
          {/* TYPE OF VALAS */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              width: "100%",
              paddingHorizontal: 20,
              marginTop: 15,
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
          <View style={styles.summaryContainer}>
            {transactionType === "jual" || transactionType === "beli" ? (
              <View>
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
            ) : transactionType === "transfer" ? (
              <View>
                <View style={styles.confirmationText}>
                  <BodyRegularText>Nama Penerima</BodyRegularText>
                  <BodyRegularText style={{ fontWeight: "bold" }}>
                    IDR {namaPenerima}
                  </BodyRegularText>
                </View>
                <View style={styles.confirmationText}>
                  <BodyRegularText>Total Transfer</BodyRegularText>
                  <BodyRegularText style={{ fontWeight: "bold" }}>
                    {totalTransfer}
                  </BodyRegularText>
                </View> 
              </View>
            ) : null}
          </View>

          {/* DOMPET SUMBER */}
          <View>
            <WalletSource
              style={{ backgroundColor: colors.color.white }}
              countryCode={"jpy"}
              saldo={"2000"}
            />
          </View>
        </View>

        <View style={styles.bottomContainer}>
          {/* JUAL BUTTON */}
          <StyledButton
            mode={"primary"}
            title={"Jual"}
            size={"lg"}
            onPress={toPinVerification}
            style={{ marginVertical: "5%" }}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  topContainer: {
    width: "100%",
    alignItems: "center",
  },
  middleContainer: { width: "100%" },
  confirmationTextTitle: {
    color: colors.primary.primaryOne,
    fontWeight: "bold",
  },
  bottomContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  summaryContainer: {
    width: "100%",
    borderBottomWidth: 5,
    borderColor: colors.primary.primaryThree,
    paddingVertical: 26,
    paddingHorizontal: 20,
  },
  confirmationText: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
