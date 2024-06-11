import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { BodyLargeText, BodyMediumText } from "../shared/StyledText";

const ResultCard = ({}) => {
  return (
    <View style={{ width: "70%" }}>
      {/* Summary Result Card Component */}
      <View style={styles.summaryResult}>
        <ImageBackground
          source={{uri:"https://i.imgur.com/EOkwhJu.png"}}
          resizeMode="cover"
          imageStyle={{ borderRadius: 20 }}
          style={styles.imageContainer}
        >
          <Image
            source={require("../../../assets/icons/flags/Japan.png")}
            style={{ width: 40, height: 40, marginBottom: 10 }}
          />
          <BodyLargeText style={{ fontWeight: "bold" }}>
            Yen Japan
          </BodyLargeText>
          <BodyLargeText>JPY</BodyLargeText>
          <BodyMediumText>18901517618</BodyMediumText>
          <BodyLargeText style={{ fontWeight: "bold", marginVertical: 20 }}>
            JPY 11000
          </BodyLargeText>
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
    paddingVertical: 20,
  },
});
