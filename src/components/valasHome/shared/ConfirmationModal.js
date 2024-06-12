import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { BottomSheet } from "@rneui/themed";
import {
  BodyRegularText,
  BodyMediumText,
  BodyLargeText,
  HeadingSixText,
} from "../../shared/StyledText";
import WalletSource from "./WalletSource";
import colors from "../../../theme/colors";
import StyledButton from "../../shared/StyledButton";
import { useNavigation } from "@react-navigation/native";
import { formatNumber } from "../../../config/ValasConfig";
import WalletValasSource from "./WalletValasSource";
import { useEffect } from "react";
import { userData } from "../../../config/AuthConfig";

const ConfirmationModal = ({
  isVisible,
  toggleBottomSheet,
  title,
  namaPenerima,
  transactionType,
  transactionData,
}) => {
  const navigation = useNavigation();
  const toPinVerification = () => {
    toggleBottomSheet();
    navigation.navigate("PinConfirmation", {
      transactionData,
      transactionType,
    });
  };

  useEffect(() => {
    console.log(transactionData.selectedWallet.id);
    console.log(transactionData.convertedValue);
    console.log(userData);
  }, [isVisible]);
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
                source={{ uri: transactionData.selectedCurrency.flagIcon }}
                style={{ width: 50, height: 50, marginRight: 10 }}
              />
            </View>
            <View>
              <BodyLargeText style={{ fontWeight: "bold" }}>
                {transactionData.selectedCurrency.currencyName}
              </BodyLargeText>
              <BodyMediumText>
                {transactionData.selectedCurrency.currencyCode}
              </BodyMediumText>
            </View>
          </View>

          {/* SUMMARY */}
          <View style={styles.summaryContainer}>
            {transactionType === "jual" || transactionType === "beli" ? (
              <View>
                <View style={styles.confirmationText}>
                  <BodyRegularText>Nominal Pembelian</BodyRegularText>
                  <BodyRegularText style={{ fontWeight: "bold" }}>
                    {transactionData.selectedCurrency.currencyCode}{" "}
                    {transactionData.inputValue}
                  </BodyRegularText>
                </View>
                <View style={styles.confirmationText}>
                  <BodyRegularText>Kurs Jual</BodyRegularText>
                  <BodyRegularText style={{ fontWeight: "bold" }}>
                    {transactionData.selectedCurrency.currencyCode} 1 = RP.{" "}
                    {transactionType === "jual"
                      ? formatNumber(transactionData.selectedCurrency.sellRate)
                      : formatNumber(transactionData.selectedCurrency.buyRate)}
                  </BodyRegularText>
                </View>
                <View style={styles.confirmationText}>
                  <BodyRegularText>Total Transaksi</BodyRegularText>
                  <BodyRegularText style={{ fontWeight: "bold" }}>
                    IDR {formatNumber(transactionData.convertedValue)}
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
                    {transactionData.totalTransfer}
                  </BodyRegularText>
                </View>
              </View>
            ) : transactionType === "add wallet" ? (
              <View>
                <View style={styles.confirmationText}>
                  <BodyRegularText>Nominal Setoran</BodyRegularText>
                  <BodyRegularText style={{ fontWeight: "bold" }}>
                    {transactionData.selectedCurrency.currencyCode}{" "}
                    {transactionData.inputValue}
                  </BodyRegularText>
                </View>
                <View style={styles.confirmationText}>
                  <BodyRegularText>Kurs Beli</BodyRegularText>
                  <BodyRegularText style={{ fontWeight: "bold" }}>
                    {transactionData.selectedCurrency.currencyCode} 1 = RP.{" "}
                    {transactionType === "jual"
                      ? formatNumber(transactionData.selectedCurrency.sellRate)
                      : formatNumber(transactionData.selectedCurrency.buyRate)}
                  </BodyRegularText>
                </View>
                <View style={styles.confirmationText}>
                  <BodyRegularText>Total Transaksi</BodyRegularText>
                  <BodyRegularText style={{ fontWeight: "bold" }}>
                    IDR {formatNumber(transactionData.convertedValue)}
                  </BodyRegularText>
                </View>
              </View>
            ) : null}
          </View>

          {/* DOMPET SUMBER */}
          <View>
            {transactionType === "beli" ? (
              <WalletSource
                style={{ backgroundColor: colors.color.white }}
                rekening={transactionData.selectedRekening.accountNumber}
                jenisRekening={transactionData.selectedRekening.type}
                saldo={transactionData.selectedRekening.balance}
              />
            ) : transactionType === "jual" ? (
              <WalletValasSource
                style={{ backgroundColor: colors.color.white }}
                countryCode={transactionData.selectedWallet.currencyCode.toLowerCase()}
                saldo={transactionData.selectedWallet.balance}
              />
            ) : transactionType === "add wallet" ? (
              <WalletSource
                style={{ backgroundColor: colors.color.white }}
                rekening={transactionData.selectedRekening.accountNumber}
                jenisRekening={transactionData.selectedRekening.type}
                saldo={transactionData.selectedRekening.balance}
              />
            ) : (
              <WalletValasSource
                style={{ backgroundColor: colors.color.white }}
                countryCode={transactionData.selectedWallet.currencyCode.toLowerCase()}
                saldo={transactionData.selectedWallet.balance}
              />
            )}
          </View>
        </View>

        <View style={styles.bottomContainer}>
          {/* JUAL BUTTON */}
          <StyledButton
            mode={"primary"}
            title={transactionType === "jual" ? "Jual" : "Beli"}
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
