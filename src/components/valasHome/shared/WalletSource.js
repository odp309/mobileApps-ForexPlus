import { Dimensions, Image, StyleSheet, View } from "react-native";
import colors from "../../../theme/colors";
import { BodyMediumText, BodySmallText } from "../../shared/StyledText";

const DIMENSION_HEIGHT = Dimensions.get("window").height;

const country = {
  // Add all your landmark images here, where the keys are countryFlag values
  aud: {
    pathImage: require("../../../../assets/Landmark-Australia.png"),
    namaValas: "Dolar Australia",
    pictHeight: "40%",
    code: "AUD",
  },
  sgd: {
    pathImage: require("../../../../assets/Landmark-Singapore.png"),
    namaValas: "Dolar Singapura",
    pictHeight: "70%",
    code: "SGD",
  },
  jpy: {
    pathImage: require("../../../../assets/Landmark-Indonesia.png"),
    namaValas: "Yen Jepang",
    pictHeight: "70%",
    code: "JPY",
  },
  thb: {
    pathImage: require("../../../../assets/Landmark-Indonesia.png"),
    namaValas: "Baht Thailand",
    pictHeight: "70%",
    code: "THB",
  },
  usd: {
    pathImage: require("../../../../assets/Landmark-Indonesia.png"),
    namaValas: "Dolar America",
    pictHeight: "70%",
    code: "USD",
  },
  cny: {
    pathImage: require("../../../../assets/Landmark-Indonesia.png"),
    namaValas: "Yuan China",
    pictHeight: "70%",
    code: "CNY",
  },
  myr: {
    pathImage: require("../../../../assets/Landmark-Indonesia.png"),
    namaValas: "Ringgit Malaysia",
    pictHeight: "70%",
    code: "MYR",
  },
  eur: {
    pathImage: require("../../../../assets/Landmark-Indonesia.png"),
    namaValas: "Euro",
    pictHeight: "70%",
    code: "EUR",
  },
  cad: {
    pathImage: require("../../../../assets/Landmark-Indonesia.png"),
    namaValas: "Dolar Kanada",
    pictHeight: "70%",
    code: "CAD",
  },
  chf: {
    pathImage: require("../../../../assets/Landmark-Indonesia.png"),
    namaValas: "Franc Swiss",
    pictHeight: "70%",
    code: "CHF",
  },
  hkd: {
    pathImage: require("../../../../assets/Landmark-Indonesia.png"),
    namaValas: "Dolar Hong Kong",
    pictHeight: "70%",
    code: "HKD",
  },
  nzd: {
    pathImage: require("../../../../assets/Landmark-Indonesia.png"),
    namaValas: "Dolar New Zealand",
    pictHeight: "70%",
    code: "NZD",
  },
  gbp: {
    pathImage: require("../../../../assets/Landmark-Indonesia.png"),
    namaValas: "Pound Inggris",
    pictHeight: "70%",
    code: "GBP",
  },
};

const WalletSource = ({ style, countryCode,saldo }) => {
  return (
    <View style={[styles.container, style]}>
      <BodyMediumText>Dompet Sumber</BodyMediumText>
      <View style={styles.cardContainer}>
        <View style={styles.borderContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <BodyMediumText style={{ fontWeight: "bold" }}>
                Dompet Valas
              </BodyMediumText>
              {/* <BodySmallText>{country[countryCode].namaValas}</BodySmallText> */}
              <BodyMediumText style={{ fontWeight: "bold" }}>
                {country[countryCode].code} {saldo}
              </BodyMediumText>
            </View>
            <View style={styles.landmarkContainer}>
                <Image
                  resizeMode="contain"
                  source={country[countryCode].pathImage}
                  style={{ width: 100, height:country[countryCode].pictHeight}}
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
            source={require("../../../../assets/Intersect.png")}
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
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: "#E8E8E8",
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
    paddingLeft: 20,
    backgroundColor: colors.color.white,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  landmarkContainer: {
    justifyContent: "flex-end",
    backgroundColor: colors.color.white,
  },
});
