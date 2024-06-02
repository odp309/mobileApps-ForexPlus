import { Dimensions, Image, StyleSheet,  View } from "react-native";
import colors from "../../theme/colors";
import {
  BodyMediumText,
  BodySmallText,
} from "../shared/StyledText";

const DIMENSION_HEIGHT = Dimensions.get("window").height;

const WalletSource = () => {
  return (
      <View style={styles.container}>
        <BodyMediumText>Dompet Sumber</BodyMediumText>
        <View style={styles.cardContainer}>
          <View style={styles.borderContainer}>
            <View style={styles.textContainer}>
              <BodyMediumText style={{ fontWeight: "bold" }}>
                Dompet Valas
              </BodyMediumText>
              <BodySmallText>Dolar Australia</BodySmallText>
              <BodyMediumText style={{ fontWeight: "bold" }}>
                AUD 20
              </BodyMediumText>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="stretch"
              style={{
                width: "100%",
                height: "100%",
                borderBottomRightRadius: 50,
                borderTopRightRadius: 50,
              }}
              source={require("../../../assets/Intersect.png")}
            />
          </View>
        </View>
      </View>
  );
};

export default WalletSource;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: "5%",
    paddingHorizontal: 20,
    height: DIMENSION_HEIGHT / 4,
    backgroundColor: "#F0EBEB",
  },
  cardContainer: {
    justifyContent: "space-between",
    height: "56%",

    borderRadius: 20,
    backgroundColor: colors.color.white,
    flexDirection: "row",
  },
  borderContainer: {
    width: "60%",
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: colors.primary.primaryOne,
  },
  imageContainer: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    width: "40%",
    height: "100%",
    backgroundColor: colors.primary.primaryOne,
  },
  textContainer: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: "10%",
    paddingLeft: 20,
    backgroundColor: colors.color.white,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
});
