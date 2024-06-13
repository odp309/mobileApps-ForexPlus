import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BodyRegularText } from "../../shared/StyledText";
import { formatNumber } from "../../../config/ValasConfig";

const SummaryConfirmation = ({ transactionData, transactionType }) => {
  return (
    <View>
      <View style={styles.confirmationText}>
        <BodyRegularText>
          Nominal{" "}
          {transactionType === "beli"
            ? "Pembelian"
            : transactionType === "jual"
            ? "Pendapatan"
            : "Setoran"}
        </BodyRegularText>
        <BodyRegularText style={{ fontWeight: "bold" }}>
          {transactionData.selectedCurrency.currencyCode}{" "}
          {transactionData.inputValue}
        </BodyRegularText>
      </View>
      <View style={styles.confirmationText}>
        <BodyRegularText>
          Kurs {transactionType === "jual" ? "Jual" : "Beli"}
        </BodyRegularText>
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
  );
};

export default SummaryConfirmation;

const styles = StyleSheet.create({
  confirmationText: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
