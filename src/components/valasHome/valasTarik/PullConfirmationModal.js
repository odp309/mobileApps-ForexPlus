import { BottomSheet } from "@rneui/themed";
import {
  BodyLargeText,
  BodyMediumText,
  BodyRegularText,
  BodySmallText,
  HeadingSixText,
} from "../../shared/StyledText";
import WalletSource from "../shared/WalletSource";
import StyledButton from "../../shared/StyledButton";
import { StyleSheet, View, TouchableOpacity, Image, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import WalletValasSource from "../shared/WalletValasSource";
import { formatNumber } from "../../../config/ValasConfig";

const BRANCH_TEXT_LENGTH = 16;

const PullConfirmationModal = ({
  modalVisibility,
  toggleBottomSheet,
  branchData,
  date,
  transactionData,
  transactionType,
}) => {
  const navigation = useNavigation();
  const formattedDate = new Date(date);
  // Function to return the longLengthBranchName to longLengthBr...
  const longText = (text) => {
    const newText = text.slice(0, BRANCH_TEXT_LENGTH);
    const textWithDot = newText + "...";
    return textWithDot;
  };

  const toPinVerification = (transactionData) => {
    toggleBottomSheet();
    navigation.navigate("PinConfirmation",{transactionType,transactionData,date,branchData});
  };
 
  return (
    <BottomSheet isVisible={modalVisibility}>
      <View style={styles.modalContent}>
        <View style={styles.topContainer}>
          {/* CLOSE BUTTON */}
          <View style={{ width: "100%", alignItems: "flex-end" }}>
            <TouchableOpacity onPress={toggleBottomSheet}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <HeadingSixText style={styles.confirmationTextTitle}>
            Konfirmasi Tarik Valas
          </HeadingSixText>
        </View>

        {/* Middle Container */}
        <View style={styles.middleContainer}>
          {/* Info Sumber */}
          <View style={styles.infoContainer}>
            <View style={styles.iconContainer}>
              <Image
                source={{ uri: transactionData.selectedWallet.flagIcon }}
                style={{ width: 50, height: 50, marginRight: 10 }}
              />
            </View>
            <View>
              <BodyLargeText style={{ fontWeight: "bold" }}>
                {transactionData.selectedWallet.currencyName}
              </BodyLargeText>
              <BodyMediumText>
                {transactionData.selectedWallet.currencyCode}
              </BodyMediumText>
            </View>
          </View>

          {/* Kantor Tujuan */}
          <View style={styles.textContainer}>
            <BodyRegularText>Cabang Penarikan</BodyRegularText>
            {branchData.name.length <= BRANCH_TEXT_LENGTH ? (
              <BodyRegularText style={{ fontWeight: "bold" }}>
                KCP {branchData.name}
              </BodyRegularText>
            ) : (
              <BodyRegularText style={{ fontWeight: "bold" }}>
                {longText(branchData.name)}
              </BodyRegularText>
            )}
          </View>

          {/* Tanggal Penarikan */}
          <View style={styles.textContainer}>
            <BodyRegularText>Tanggal Penarikan</BodyRegularText>
            <BodyRegularText style={{ fontWeight: "bold" }}>
              {formattedDate.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </BodyRegularText>
          </View>

          {/* Total Penarikan */}
          <View style={styles.totalPenarikan}>
            <BodyRegularText>Total Penarikan</BodyRegularText>
            <BodyRegularText style={{ fontWeight: "bold" }}>
              {transactionData.selectedWallet.currencyCode}{" "}
              {transactionData.inputValue}
            </BodyRegularText>
          </View>

          {/* Dompet SUMBER */}
          <WalletValasSource
            style={{ backgroundColor: colors.color.white }}
            countryCode={transactionData.selectedWallet.currencyCode.toLowerCase()}
            saldo={formatNumber(transactionData.selectedWallet.balance)}
          />
        </View>

        {/* Bottom Container */}
        <View style={styles.bottomContainer}>
          <StyledButton
            mode="primary"
            title="Tarik"
            size={"lg"}
            onPress={() => toPinVerification(transactionData)}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default PullConfirmationModal;

const styles = StyleSheet.create({
  container: {},
  modalContent: {
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  topContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  middleContainer: {
    width: "100%",
  },

  bottomContainer: {
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  confirmationTextTitle: {
    color: colors.primary.primaryOne,
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    marginHorizontal: 20,
  },
  totalPenarikan: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderColor: colors.primary.primaryThree,
    borderBottomWidth: 5,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
