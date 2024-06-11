import { Image, StyleSheet, View } from "react-native";
import colors from "../../../theme/colors";
import { BodyMediumText, BodySmallText } from "../../shared/StyledText";

const WalletRekeningSource = ({ containerStyle, balanceType, balanceNum, balance }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <BodyMediumText>Rekening Sumber</BodyMediumText>
      <View style={styles.cardContainer}>
        <View style={styles.borderContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <BodyMediumText style={{ fontWeight: "bold" }}>
                {balanceType.toUpperCase()}
              </BodyMediumText>
              <BodySmallText>{balanceNum}</BodySmallText>
              <BodyMediumText style={{ fontWeight: "bold" }}>
                Rp. {balance}
              </BodyMediumText>
            </View>
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
            source={require("../../../../assets/Intersect.png")}
          />
        </View>
      </View>
    </View>
  );
};

export default WalletRekeningSource;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: colors.color.white,
  },
  cardContainer: {
    height: 100,
    borderRadius: 20,
    backgroundColor: colors.color.white,
    flexDirection: "row",
    marginTop: 5,

    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5, // Adjust the opacity for desired effect
    shadowRadius: 5, // Adjust the radius for desired effect
    elevation: 5, // Android shadow
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
    backgroundColor: colors.primary.primaryOne,
  },
  contentContainer: {
    flexDirection: "row",
    height: "95%",
    shadowColor: "#000",
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
  textContainer: {
    width:'100%',
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    backgroundColor: colors.color.white,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
});
