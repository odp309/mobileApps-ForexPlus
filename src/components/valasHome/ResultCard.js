import { Image, ImageBackground, StyleSheet, View } from "react-native";
import {
  BodyLargeText,
  BodyMediumText,
  BodyRegularText,
  HeadingSixText,
} from "../shared/StyledText";
import { country } from "../../config/CountryDataConfig";
import colors from "../../theme/colors";

const ResultCard = ({ transactionType, transactionData }) => {
  return (
    <View style={{ width: "70%", height:'65%' }}>
      {/* Summary Result Card Component */}
      <View style={styles.summaryResult}>
        <ImageBackground
          source={{ uri: "https://i.imgur.com/EOkwhJu.png" }}
          resizeMode="cover"
          imageStyle={{ borderRadius: 20 }}
          style={styles.imageContainer}
        >
          {transactionType === "transfer" ? (
            <View style={{height:"100%", justifyContent:'space-evenly'}}>
              <View style={{alignItems:"center"}}>
                <BodyRegularText style={{ color: colors.color.lightGrey }}>
                  Nama Penerima
                </BodyRegularText>
                <BodyLargeText style={{ color: colors.color.black, fontWeight:'bold' }}>
                  {transactionData.namaPenerima}
                </BodyLargeText>
                <BodyRegularText style={{ color: colors.color.lightGrey }}>
                  {transactionData.noRek}
                </BodyRegularText>
              </View>
              <View style={{alignItems:"center"}}>
                <BodyRegularText style={{ color: colors.color.lightGrey }}>
                  {transactionData.noRek}
                </BodyRegularText>
                <BodyLargeText style={{ color: colors.color.black, fontWeight:'bold' }}>
                  {country[transactionData.tipeValas].code}  {transactionData.saldo}
                </BodyLargeText>
              </View>
            </View>
          ) : (
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../../assets/icons/flags/Japan.png")}
                style={{ width: 40, height: 40, marginBottom: 10 }}
              />
              <BodyLargeText style={{ fontWeight: "bold" }}>
                {country[transactionData.tipeValas].namaValas}
              </BodyLargeText>
              <BodyLargeText>
                {country[transactionData.tipeValas].code}
              </BodyLargeText>
              <BodyMediumText>{transactionData.noRek}</BodyMediumText>
              <BodyLargeText style={{ fontWeight: "bold", marginVertical: 20 }}>
                {country[transactionData.tipeValas].code}{" "}
                {transactionData.saldo}
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
    alignItems: "center",
    justifyContent:'center',
    paddingVertical: 20,
  },
});
