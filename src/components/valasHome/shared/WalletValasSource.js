import { Dimensions, Image, StyleSheet, View } from "react-native";
import colors from "../../../theme/colors";
import { BodyMediumText, BodySmallText } from "../../shared/StyledText";
import { useEffect } from "react";
import { formatNumber } from "../../../config/ValasConfig";

const DIMENSION_HEIGHT = Dimensions.get("window").height;

const WalletValasSource = ({ style,selectedWallet}) => {
  return (
    <View style={[styles.container, style]}>
      <BodyMediumText>Dompet Sumber</BodyMediumText>
      <View style={styles.cardContainer}>
        <View style={styles.borderContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <BodyMediumText style={{ fontWeight: "bold" }}>
                DOMPET VALAS
              </BodyMediumText>
              <BodySmallText>{selectedWallet.currencyName}</BodySmallText>
              <BodyMediumText style={{ fontWeight: "bold" }}>
                {selectedWallet.currencyCode} {formatNumber(selectedWallet.balance)}
              </BodyMediumText>
            </View>
            <View style={styles.landmarkContainer}>
                <Image
                  resizeMode="contain"
                  source={{uri: selectedWallet.landmarkIcon}}
                  style={{ width: 85, height: "70%"}}
                />
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
            source={{uri:"https://imgur.com/WD5nbpF.png"}}
          />
        </View>
      </View>
    </View>
  );
};

export default WalletValasSource;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 20, 
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
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 15,
    backgroundColor: colors.color.white,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,  
    
  },
  landmarkContainer: {
    justifyContent: "flex-end",
    backgroundColor: colors.color.white, 
  },
});
