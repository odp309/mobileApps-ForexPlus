import { Image, ImageBackground, StyleSheet, View } from "react-native";
import {
  BodyLargeText,
  BodyMediumText,
  BodyRegularText,
  HeadingSixText,
} from "../shared/StyledText";
import { country } from "../../config/CountryDataConfig";
import colors from "../../theme/colors";
import { useEffect } from "react";

const ResultCard = ({ transactionType, transactionData }) => {
  useEffect(() => {
    console.log("transactionDataKOKO:");
    console.log(transactionData);
  });
  return (
    <View style={{ width: "70%", height: "100%"}}>
      {/* Summary Result Card Component */}
      <View style={styles.summaryResult}>
        <ImageBackground
          source={require("../../../assets/SummaryBackground.png")}
          resizeMode="cover"
          imageStyle={{ borderRadius: 20 }}
          style={styles.imageContainer}
        >
          {transactionType === "transfer" ? (
            <View style={{justifyContent: "space-evenly",paddingVertical:20 }}>
              <View style={{ alignItems: "center",marginBottom:20 }}>
                <BodyRegularText style={{ color: colors.color.lightGrey }}>
                  Nama Penerima
                </BodyRegularText>
                <BodyLargeText
                  style={{ color: colors.color.black, fontWeight: "bold" }}
                >
                  {transactionData.accountFind.firstName} {transactionData.accountFind.lastName}
                </BodyLargeText>
                <BodyRegularText style={{ color: colors.color.lightGrey }}>
                  {transactionData.accountFind.wallet.accountNumber}
                </BodyRegularText>
              </View>
              <View style={{ alignItems: "center" }}>
                <BodyRegularText style={{ color: colors.color.lightGrey }}>
                  Nominal yang Ditransfer
                </BodyRegularText>
                <BodyLargeText
                  style={{ color: colors.color.black, fontWeight: "bold" }}
                >
                  {transactionData.accountFind.wallet.currencyCode}{" "}{transactionData.inputValue}
                </BodyLargeText>
              </View>
            </View>
          ) : (
            <View style={{ alignItems: "center" }}>
              <Image
                source={{uri: transactionData.selectedCurrency.flagIcon}}
                style={{ width: 40, height: 40, marginBottom: 10 }}
              />
              <BodyLargeText style={{ fontWeight: "bold" }}>
                {transactionData.selectedCurrency.currencyName}
              </BodyLargeText>
              <BodyLargeText>
                {transactionData.selectedCurrency.currencyCode}
              </BodyLargeText>
              <BodyMediumText>
                {transactionData.selectedRekening.accountNumber}
              </BodyMediumText>
              <BodyLargeText style={{ fontWeight: "bold", marginVertical: 20 }}>
                {transactionData.selectedCurrency.currencyCode}{" "}
                {transactionData.inputValue}
              </BodyLargeText>
            </View>
          )}
        </ImageBackground>
      </View>
    </View>
  );
};

export default ResultCard;

const styles = StyleSheet.create({
  summaryResult: {
    width: "100%",
    // paddingBottom:20,
    backgroundColor: "transparent",
    borderRadius: 20,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 8,
    backgroundColor: "white",
  },
  imageContainer: {
    width: "100%",
    // height:"100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
});
